package ma.dgi.vision360.timeline.mapper;

import ma.dgi.vision360.timeline.dto.TimelineEventDto;
import ma.dgi.vision360.timeline.entity.TimelineEvent;

public final class TimelineMapper {
    private TimelineMapper() {}

    public static TimelineEventDto toDto(TimelineEvent e) {
        if (e == null) return null;
        return new TimelineEventDto(
                e.getId(),
                e.getTaxpayerId(),
                e.getType(),
                e.getSeverity(),
                e.getOccurredAt(),
                e.getPayload()
        );
    }
}
