package ma.dgi.vision360.graph;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.util.Map;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Neighbor implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;
    /** "v" (vertex) or "e" (edge). May also be "vertex"/"edge" when coming from AQL. */
    private String type;
    /** Collection name (e.g. companies, persons, employs, …). */
    private String collection;
    /** The raw ArangoDB document/edge as a map. */
    private Map<String, Object> data;

    // Edge-only (exposed as "from"/"to")
    private String from;
    private String to;

    public Neighbor() {}

    // ---- factory helpers ----------------------------------------------------
    @SuppressWarnings("unchecked")
    public static Neighbor fromVertex(Map<?, ?> v) {
        Neighbor n = new Neighbor();
        n.setType("v");
        n.setId((String) v.get("_id"));
        n.setCollection(deriveCollection(n.getId(), (String) v.get("_collection")));
        n.setData((Map<String, Object>) v);
        return n;
    }

    @SuppressWarnings("unchecked")
    public static Neighbor fromEdge(Map<?, ?> e) {
        Neighbor n = new Neighbor();
        n.setType("e");
        n.setId((String) e.get("_id"));
        n.setCollection(deriveCollection(n.getId(), (String) e.get("_collection")));
        n.setFrom((String) e.get("_from"));
        n.setTo((String) e.get("_to"));
        n.setData((Map<String, Object>) e);
        return n;
    }

    private static String deriveCollection(String id, String explicit) {
        if (explicit != null) return explicit;
        if (id != null) {
            int i = id.indexOf('/');
            if (i > 0) return id.substring(0, i);
        }
        return null;
    }

    // Convenience flags (not serialized)
    @JsonIgnore
    public boolean isVertex() { return "v".equalsIgnoreCase(type) || "vertex".equalsIgnoreCase(type); }

    @JsonIgnore
    public boolean isEdge() { return "e".equalsIgnoreCase(type) || "edge".equalsIgnoreCase(type); }

    // ---- getters & setters --------------------------------------------------
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getCollection() { return collection; }
    public void setCollection(String collection) { this.collection = collection; }

    public Map<String, Object> getData() { return data; }

    public void setData(Map<String, Object> data) {
        this.data = data;

        // Auto-fill common fields if missing, based on the raw Arango doc/edge
        if (data != null) {
            if (this.id == null) {
                Object _id = data.get("_id");
                if (_id instanceof String) this.id = (String) _id;
            }
            if (this.collection == null) {
                Object _coll = data.get("_collection"); // may or may not exist
                this.collection = deriveCollection(this.id, _coll instanceof String ? (String) _coll : null);
            }
            if (this.from == null) {
                Object _from = data.get("_from");
                if (_from instanceof String) this.from = (String) _from;
            }
            if (this.to == null) {
                Object _to = data.get("_to");
                if (_to instanceof String) this.to = (String) _to;
            }
        }
    }

    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }

    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }

    // ---- equals / hashCode / toString --------------------------------------
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Neighbor)) return false;
        Neighbor that = (Neighbor) o;
        return Objects.equals(id, that.id) && Objects.equals(type, that.type);
    }

    @Override public int hashCode() { return Objects.hash(id, type); }

    @Override public String toString() {
        return "Neighbor{" +
                "id='" + id + '\'' +
                ", type='" + type + '\'' +
                ", collection='" + collection + '\'' +
                ", from='" + from + '\'' +
                ", to='" + to + '\'' +
                '}';
    }
}

