package ma.dgi.vision360.watchlist.dto;
import java.util.UUID;
public record WatchlistMemberDto(UUID watchlistId, UUID taxpayerId, String reason, String source) {}
