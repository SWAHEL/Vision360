package ma.dgi.vision360.timeline.dto;

import com.fasterxml.jackson.databind.JsonNode;

import java.time.OffsetDateTime;
import java.util.UUID;

public class TimelineEventDto {
    private UUID id;
    private UUID taxpayerId;
    private String type;
    private String severity;
    private OffsetDateTime occurredAt;
    private JsonNode payload; // if you mapped entity as String, change to String

    public TimelineEventDto() {}

    public TimelineEventDto(UUID id, UUID taxpayerId, String type, String severity,
                            OffsetDateTime occurredAt, JsonNode payload) {
        this.id = id;
        this.taxpayerId = taxpayerId;
        this.type = type;
        this.severity = severity;
        this.occurredAt = occurredAt;
        this.payload = payload;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getTaxpayerId() { return taxpayerId; }
    public void setTaxpayerId(UUID taxpayerId) { this.taxpayerId = taxpayerId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public OffsetDateTime getOccurredAt() { return occurredAt; }
    public void setOccurredAt(OffsetDateTime occurredAt) { this.occurredAt = occurredAt; }

    public JsonNode getPayload() { return payload; }
    public void setPayload(JsonNode payload) { this.payload = payload; }
}
