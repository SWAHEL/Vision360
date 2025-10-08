package ma.dgi.vision360.timeline;

import lombok.RequiredArgsConstructor;
import ma.dgi.vision360.timeline.dto.TimelineEventDto;
import ma.dgi.vision360.timeline.dto.TimelinePageDto;
import ma.dgi.vision360.timeline.entity.TimelineEvent;
import ma.dgi.vision360.timeline.mapper.TimelineMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TimelineService {

    private final TimelineEventRepository repo;

    /** Read timeline for a taxpayer with limit/offset paging. */
    public TimelinePageDto getForTaxpayer(UUID taxpayerId, int limit, int offset) {
        int size = Math.max(1, limit);
        int page = Math.max(0, offset / size);

        var pageReq = PageRequest.of(page, size);
        var pageRes = repo.findByTaxpayerIdOrderByOccurredAtDesc(taxpayerId, pageReq);

        List<TimelineEventDto> items = pageRes.getContent().stream()
                .map(TimelineMapper::toDto)
                .toList();

        long total = repo.countByTaxpayerId(taxpayerId);

        return new TimelinePageDto(items, total);
    }

    /** (Optional) Create a new timeline event. */
    public TimelineEventDto create(UUID taxpayerId, String type, String severity,
                                   OffsetDateTime occurredAt, com.fasterxml.jackson.databind.JsonNode payload) {
        TimelineEvent e = new TimelineEvent();
        e.setTaxpayerId(taxpayerId);
        e.setType(type);
        e.setSeverity(severity);
        e.setOccurredAt(occurredAt != null ? occurredAt : OffsetDateTime.now());
        e.setPayload(payload);
        e = repo.save(e);
        return TimelineMapper.toDto(e);
    }
}
