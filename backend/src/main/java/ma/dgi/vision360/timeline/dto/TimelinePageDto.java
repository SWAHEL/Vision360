package ma.dgi.vision360.timeline.dto;

import java.util.List;

public class TimelinePageDto {
    private List<TimelineEventDto> items;
    private long total;

    public TimelinePageDto() {}

    public TimelinePageDto(List<TimelineEventDto> items, long total) {
        this.items = items;
        this.total = total;
    }

    public List<TimelineEventDto> getItems() { return items; }
    public void setItems(List<TimelineEventDto> items) { this.items = items; }

    public long getTotal() { return total; }
    public void setTotal(long total) { this.total = total; }
}
