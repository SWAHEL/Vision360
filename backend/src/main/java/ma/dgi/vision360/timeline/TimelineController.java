package ma.dgi.vision360.timeline;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import ma.dgi.vision360.timeline.dto.TimelineEventDto;
import ma.dgi.vision360.timeline.dto.TimelinePageDto;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/timeline")
@RequiredArgsConstructor
public class TimelineController {

    private final TimelineService service;

    /** GET /api/v1/timeline?taxpayerId=...&limit=10&offset=0 */
    @GetMapping
    public TimelinePageDto list(
            @RequestParam UUID taxpayerId,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "0") int offset
    ) {
        return service.getForTaxpayer(taxpayerId, limit, offset);
    }

    /** POST /api/v1/timeline  (create one event) */
    @PostMapping
    public TimelineEventDto create(@RequestBody CreateTimelineEventRequest req) {
        return service.create(
                req.taxpayerId(),
                req.type(),
                req.severity(),
                req.occurredAt(),
                req.payload()
        );
    }

    /** simple request body for creating events */
    public record CreateTimelineEventRequest(
            UUID taxpayerId,
            String type,
            String severity,
            OffsetDateTime occurredAt,
            JsonNode payload
    ) {}
}
