package ma.dgi.vision360.watchlist.dto;
import java.util.UUID;
public record WatchlistDto(UUID id, String name, String type, boolean active) {}
