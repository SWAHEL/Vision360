package ma.dgi.vision360.timeline;
import org.springframework.web.bind.annotation.*; import org.springframework.http.ResponseEntity;
@RestController @RequestMapping("/api/v1/timeline")
public class TimelineController { @GetMapping public ResponseEntity<?> list(){ return ResponseEntity.ok().build(); } }
