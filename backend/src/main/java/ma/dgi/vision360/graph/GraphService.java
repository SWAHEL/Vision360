package ma.dgi.vision360.graph;

import com.arangodb.ArangoCursor;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDatabase;
import com.arangodb.model.AqlQueryOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GraphService {

    private final ArangoDB arango;
    private final String databaseName;

    /** Edge collections used by traversals (no named graph required). */
    private static final String EDGE_LIST = "hasAddress, hasPhone, worksAt";

    public GraphService(ArangoDB arango,
                        @Value("${arangodb.database:vision360}") String databaseName) {
        this.arango = arango;
        this.databaseName = databaseName;
    }

    /* ============================ NEIGHBORS ============================ */

    /** Minimal helper: edges only, ANY direction, depth=N, limit=200. */
    public List<Neighbor> neighbors(String startId, int depth) {
        return neighbors(startId, depth, "ANY", false, 200);
    }

    /**
     * Full neighbors helper. Returns items shaped for your {@link Neighbor} DTO:
     * - when includeVertices=false → only edges (type "e")
     * - when includeVertices=true  → edges and vertices (type "e" or "v")
     */
    public List<Neighbor> neighbors(String startId,
                                    int depth,
                                    String direction,
                                    boolean includeVertices,
                                    int limit) {
        if (startId == null || startId.isBlank()) {
            throw new IllegalArgumentException("startId must not be blank");
        }
        if (depth < 1) depth = 1;
        if (limit < 1) limit = 200;

        final String dir = switch (direction == null ? "ANY" : direction.toUpperCase(Locale.ROOT)) {
            case "OUTBOUND" -> "OUTBOUND";
            case "INBOUND"  -> "INBOUND";
            default         -> "ANY";
        };

        final ArangoDatabase db = arango.db(databaseName);
        final AqlQueryOptions opts = new AqlQueryOptions().batchSize(1000).fullCount(false).cache(false);
        final Map<String, Object> bind = Map.of("start", startId, "depth", depth, "limit", limit);

        // AQL: text blocks must start with a newline after opening """.
        final String aql = includeVertices
                ? ("""
                   FOR v, e IN 1..@depth %s @start %s
                     LIMIT @limit
                     RETURN e != null
                       ? MERGE(e, { _kind: "e", _collection: PARSE_IDENTIFIER(e).collection })
                       : MERGE(v, { _kind: "v", _collection: PARSE_IDENTIFIER(v).collection })
                   """).formatted(dir, EDGE_LIST)
                : ("""
                   FOR v, e IN 1..@depth %s @start %s
                     FILTER e != null
                     LIMIT @limit
                     RETURN MERGE(e, { _kind: "e", _collection: PARSE_IDENTIFIER(e).collection })
                   """).formatted(dir, EDGE_LIST);

        try (ArangoCursor<Map> cursor =
                     db.query(aql, Map.class, bind, opts)) {

            List<Neighbor> out = new ArrayList<>();
            while (cursor.hasNext()) {
                Map<String, Object> row = cursor.next();

                // Decide edge vs vertex via _kind; fallback to presence of _from/_to
                String kind = (String) row.get("_kind");
                if (kind == null) {
                    kind = (row.containsKey("_from") && row.containsKey("_to")) ? "e" : "v";
                }

                Neighbor n = "e".equalsIgnoreCase(kind) || "edge".equalsIgnoreCase(kind)
                        ? Neighbor.fromEdge(row)
                        : Neighbor.fromVertex(row);

                out.add(n);
            }
            return out;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch neighbors: " + e.getMessage(), e);
        }
    }

    /* ========================= FULL GRAPH (nodes+edges) ========================= */

    /**
     * Export a multi-hop graph around **all companies**.
     * We collect edges first, then materialize both endpoints as nodes.
     * This guarantees the frontend always receives complete, linked graphs.
     */
    public Map<String, Object> fullGraph(int limit) {
        final ArangoDatabase db = arango.db(databaseName);
        if (limit < 100) limit = 100;
        if (limit > 20000) limit = 20000;

        final String aql = """
          // collect company roots
          LET roots = (FOR c IN companies RETURN c._id)

          // collect only edges up to 2 hops (across the three edge collections)
          LET relEdges = UNIQUE(
            FOR r IN roots
              FOR v, e IN 1..2 ANY r hasAddress, hasPhone, worksAt
                FILTER e != null
                LIMIT @limit
                RETURN e
          )

          // all vertex ids are both endpoints of the edges
          LET vertexIds = UNIQUE(
            FLATTEN(
              FOR e IN relEdges
                RETURN [ e._from, e._to ]
            )
          )

          // materialize vertices for UI
          LET nodes = UNIQUE(
            FOR vid IN vertexIds
              LET v = DOCUMENT(vid)
              FILTER v != null
              RETURN {
                id: v._id,
                key: v._key,
                label: v.name ? v.name
                       : (v.fullName ? v.fullName
                       : (v.number ? v.number
                       : (v.city ? v.city : v._key))),
                type: PARSE_IDENTIFIER(v._id).collection
              }
          )

          // normalize edges for UI
          LET edges = UNIQUE(
            FOR e IN relEdges
              RETURN {
                id: e._id,
                from: e._from,
                to: e._to,
                type: PARSE_IDENTIFIER(e._id).collection
              }
          )

          RETURN { nodes, edges }
        """;

        final Map<String, Object> bind = Map.of("limit", limit);
        final AqlQueryOptions opts = new AqlQueryOptions().batchSize(1000).fullCount(false).cache(false);

        try (ArangoCursor<Map> cur =
                     db.query(aql, Map.class, bind, opts)) {
            return cur.hasNext() ? cur.next()
                    : Map.of("nodes", List.of(), "edges", List.of());
        } catch (Exception e) {
            throw new RuntimeException("Failed to export full graph", e);
        }
    }

    /* ========================= COMPANY CARD ========================= */

    public Map<String, Object> companyCard(String companyKey) {
        if (companyKey == null || companyKey.isBlank()) {
            throw new IllegalArgumentException("companyKey is required");
        }

        final ArangoDatabase db = arango.db(databaseName);

        final String aql = """
          LET cid = @cid
          LET company = DOCUMENT(cid)

          LET phones = (
            FOR e IN hasPhone
              FILTER e._from == cid
              RETURN MERGE(DOCUMENT(e._to), { edge: e })
          )

          LET addresses = (
            FOR e IN hasAddress
              FILTER e._from == cid
              RETURN MERGE(DOCUMENT(e._to), { edge: e })
          )

          LET employees = (
            FOR w IN worksAt
              FILTER w._to == cid
              LET p = DOCUMENT(w._from)
              LET name = p.fullName ? p.fullName :
                         (p.firstName ? CONCAT(p.firstName, " ", p.lastName) : p._key)
              SORT name ASC
              RETURN { id: p._id, name: name, role: p.role, title: w.title, since: w.since }
          )

          RETURN { company, phones, addresses, employees }
        """;

        final Map<String, Object> bind = Map.of("cid", "companies/" + companyKey);
        final AqlQueryOptions opts = new AqlQueryOptions().batchSize(500).fullCount(false).cache(false);

        try (ArangoCursor<Map> cur =
                     db.query(aql, Map.class, bind, opts)) {
            return cur.hasNext() ? cur.next()
                    : Map.of("company", null, "phones", List.of(), "addresses", List.of(), "employees", List.of());
        } catch (Exception e) {
            throw new RuntimeException("Failed to build company card for " + companyKey, e);
        }
    }

    /* ========================= COUNTS (debug) ========================= */

    public Map<String, Object> counts() {
        final ArangoDatabase db = arango.db(databaseName);
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("companies", db.collection("companies").count());
        out.put("people", db.collection("people").count());
        out.put("addresses", db.collection("addresses").count());
        out.put("phones", db.collection("phones").count());
        out.put("hasAddress", db.collection("hasAddress").count());
        out.put("hasPhone", db.collection("hasPhone").count());
        out.put("worksAt", db.collection("worksAt").count());
        return out;
    }
}
