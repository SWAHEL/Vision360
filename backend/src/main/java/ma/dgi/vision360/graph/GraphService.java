package ma.dgi.vision360.graph;

import com.arangodb.ArangoCursor;
import com.arangodb.ArangoDB;
import com.arangodb.ArangoDatabase;
import com.arangodb.model.AqlQueryOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GraphService {

    private final ArangoDB arango;
    private final String databaseName;

    public GraphService(ArangoDB arango,
                        @Value("${arangodb.database:vision360}") String databaseName) {
        this.arango = arango;
        this.databaseName = databaseName;
    }

    /* =========================================================
       NEIGHBORS (via named graph 'visionGraph', no collection list)
       ========================================================= */

    /** Minimal helper (edges only, ANY direction, limit 200). */
    public List<Neighbor> neighbors(String startId, int depth) {
        return neighbors(startId, depth, "ANY", false, 200);
    }

    /**
     * Full helper with options.
     *
     * @param startId         e.g. "companies/RENACO"
     * @param depth           >= 1
     * @param direction       OUTBOUND | INBOUND | ANY
     * @param includeVertices true to include vertex rows too
     * @param limit           max rows to return (server-side)
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

        // Normalize direction to AQL keyword
        final String dir = switch (direction == null ? "ANY" : direction.toUpperCase()) {
            case "OUTBOUND" -> "OUTBOUND";
            case "INBOUND"  -> "INBOUND";
            default         -> "ANY";
        };

        final ArangoDatabase db = arango.db(databaseName);

        // Build AQL using the *named graph* (robust to collection renames)
        final String aql;
        if (includeVertices) {
            aql =
                    "FOR v, e IN 1..@depth " + dir + " @start GRAPH 'visionGraph'\n" +
                            "LIMIT @limit\n" +
                            "RETURN e != null ? {\n" +
                            "  id: e._id, type: 'e', collection: PARSE_IDENTIFIER(e).collection,\n" +
                            "  data: e, from: e._from, to: e._to\n" +
                            "} : {\n" +
                            "  id: v._id, type: 'v', collection: PARSE_IDENTIFIER(v).collection, data: v\n" +
                            "}";
        } else {
            aql =
                    "FOR v, e IN 1..@depth " + dir + " @start GRAPH 'visionGraph'\n" +
                            "FILTER e != null\n" +
                            "LIMIT @limit\n" +
                            "RETURN {\n" +
                            "  id: e._id, type: 'e', collection: PARSE_IDENTIFIER(e).collection,\n" +
                            "  data: e, from: e._from, to: e._to\n" +
                            "}";
        }

        final Map<String, Object> bind = Map.of(
                "start", startId,
                "depth", depth,
                "limit", limit
        );

        final AqlQueryOptions opts = new AqlQueryOptions();

        try (ArangoCursor<Neighbor> cursor = db.query(aql, Neighbor.class, bind, opts)) {
            return cursor.asListRemaining();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch neighbors: " + e.getMessage(), e);
        }
    }

    /* =========================================================
       FULL GRAPH EXPORT  -> { nodes, edges }
       ========================================================= */

    /**
     * Export a 2-hop graph around all companies in the named graph.
     * Result shape:
     * { "nodes":[{id,key,label,type},...], "edges":[{id,from,to,type,label,meta},...] }
     */
    public Map<String, Object> fullGraph() {
        final ArangoDatabase db = arango.db(databaseName);

        final String aql = """
          LET roots = (FOR c IN companies RETURN c._id)

          LET rel = (
            FOR r IN roots
              FOR v,e,p IN 1..2 ANY r GRAPH "visionGraph"
                RETURN DISTINCT { v, e }
          )

          LET nodes = UNIQUE(
            FOR it IN rel
              LET v = it.v
              RETURN {
                id: v._id,
                key: v._key,
                label: v.name ? v.name
                       : (v.firstName ? CONCAT(v.firstName," ",v.lastName," (",v.role,")")
                       : (v.number ? v.number
                       : (v.city ? CONCAT(v.line1,", ",v.city) : v._key))),
                type: PARSE_IDENTIFIER(v._id).collection
              }
          )

          LET edges = UNIQUE(
            FOR it IN rel
              FILTER it.e != null
              LET e = it.e
              RETURN {
                id: e._id, from: e._from, to: e._to,
                type: PARSE_IDENTIFIER(e._id).collection,
                label: e.title ? e.title : (e.label ? e.label : (e.since ? e.since : "")),
                meta: e
              }
          )

          RETURN { nodes, edges }
        """;

        try (ArangoCursor<Map> cur = db.query(aql, Map.class, null, new AqlQueryOptions())) {
            return cur.next(); // single object with nodes & edges
        } catch (Exception e) {
            throw new RuntimeException("Failed to export full graph", e);
        }
    }

    /* =========================================================
       COMPANY CARD  -> company + phones + addresses + employees
       ========================================================= */

    /**
     * Build a company card for given key (e.g. "ARAVO").
     * Result shape:
     * { company:{...}, phones:[...], addresses:[...], employees:[{id,name,role,title,since}] }
     */
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
              LET fullName = CONCAT(p.firstName, " ", p.lastName)
              SORT fullName ASC
              RETURN { id: p._id, name: fullName, role: p.role, title: w.title, since: w.since }
          )

          RETURN { company, phones, addresses, employees }
        """;

        final Map<String, Object> bind = new HashMap<>();
        bind.put("cid", "companies/" + companyKey);

        try (ArangoCursor<Map> cur = db.query(aql, Map.class, bind, new AqlQueryOptions())) {
            return cur.next();
        } catch (Exception e) {
            throw new RuntimeException("Failed to build company card for " + companyKey, e);
        }
    }
}
