package ma.dgi.vision360.timeline.entity;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "timeline_event")
public class TimelineEvent {

  @Id
  @GeneratedValue
  private UUID id;

  @Column(name = "taxpayer_id", nullable = false)
  private UUID taxpayerId;

  @Column(name = "type", nullable = false, length = 64)
  private String type;

  @Column(name = "severity", length = 16)
  private String severity;

  @Column(name = "occurred_at", nullable = false)
  private OffsetDateTime occurredAt;

  // Store as jsonb without hibernate-types
  @Convert(converter = JsonNodeConverter.class)
  @Column(columnDefinition = "jsonb")
  private JsonNode payload;

  /* lifecycle: set occurredAt if missing */
  @PrePersist
  public void prePersist() {
    if (occurredAt == null) {
      occurredAt = OffsetDateTime.now();
    }
  }

  // Getters / setters
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
