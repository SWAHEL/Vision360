package ma.dgi.vision360.watchlist.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "watchlist_member")
@IdClass(WatchlistMemberId.class)
public class WatchlistMember {

    @Id
    @Column(name = "watchlist_id")
    private UUID watchlist_id;

    @Id
    @Column(name = "taxpayer_id")
    private UUID taxpayer_id;

    @Column(name = "added_by")
    private String added_by;

    @Column(name = "added_at")
    private OffsetDateTime added_at;

    @Column(name = "reason")
    private String reason;

    @Column(name = "source")
    private String source;

    public WatchlistMember() {}

    public UUID getWatchlist_id() { return watchlist_id; }
    public void setWatchlist_id(UUID v) { this.watchlist_id = v; }
    public UUID getTaxpayer_id() { return taxpayer_id; }
    public void setTaxpayer_id(UUID v) { this.taxpayer_id = v; }
    public String getAdded_by() { return added_by; }
    public void setAdded_by(String v) { this.added_by = v; }
    public OffsetDateTime getAdded_at() { return added_at; }
    public void setAdded_at(OffsetDateTime v) { this.added_at = v; }
    public String getReason() { return reason; }
    public void setReason(String v) { this.reason = v; }
    public String getSource() { return source; }
    public void setSource(String v) { this.source = v; }
}
