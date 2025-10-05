package ma.dgi.vision360.timeline.entity;
import jakarta.persistence.*; import java.util.UUID;
@Entity @Table(name="timeline_event")
public class TimelineEvent {
  @Id @GeneratedValue public UUID id; public UUID taxpayer_id; public String type; public String severity;
  public java.time.OffsetDateTime occurred_at; @Column(columnDefinition="jsonb") public String payload;
}
