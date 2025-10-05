package ma.dgi.vision360.common;

import java.util.List;

public class PageResponse<T> {
    private final List<T> items;
    private final String nextCursor;

    public PageResponse(List<T> items, String nextCursor) {
        this.items = items;
        this.nextCursor = nextCursor;
    }
    public List<T> getItems() { return items; }
    public String getNextCursor() { return nextCursor; }
}
