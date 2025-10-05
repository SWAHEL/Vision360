package ma.dgi.vision360.watchlist;
import org.springframework.web.bind.annotation.*; import org.springframework.http.ResponseEntity;
@RestController @RequestMapping("/api/v1/watchlists")
public class WatchlistController {
  @GetMapping public ResponseEntity<?> list(){ return ResponseEntity.ok().build(); }
}
