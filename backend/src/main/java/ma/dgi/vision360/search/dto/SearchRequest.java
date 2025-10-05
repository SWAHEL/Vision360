package ma.dgi.vision360.search.dto;

public record SearchRequest(
        String q,
        String ville,
        String secteur,
        Integer size,
        String cursor
) {
    public int sizeOrDefault() {
        return (size == null || size <= 0 || size > 100) ? 30 : size;
    }
}
