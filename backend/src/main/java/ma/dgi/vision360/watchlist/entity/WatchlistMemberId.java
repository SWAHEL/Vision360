package ma.dgi.vision360.watchlist.entity;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

public class WatchlistMemberId implements Serializable {
    private UUID watchlist_id;
    private UUID taxpayer_id;

    public WatchlistMemberId() {}
    public WatchlistMemberId(UUID watchlist_id, UUID taxpayer_id) {
        this.watchlist_id = watchlist_id;
        this.taxpayer_id = taxpayer_id;
    }

    public UUID getWatchlist_id() { return watchlist_id; }
    public void setWatchlist_id(UUID v) { this.watchlist_id = v; }
    public UUID getTaxpayer_id() { return taxpayer_id; }
    public void setTaxpayer_id(UUID v) { this.taxpayer_id = v; }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WatchlistMemberId that)) return false;
        return Objects.equals(watchlist_id, that.watchlist_id)
                && Objects.equals(taxpayer_id, that.taxpayer_id);
    }
    @Override public int hashCode() { return Objects.hash(watchlist_id, taxpayer_id); }
}
