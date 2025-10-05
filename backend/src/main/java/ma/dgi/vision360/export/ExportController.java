package ma.dgi.vision360.export;
import org.springframework.web.bind.annotation.*; import org.springframework.http.ResponseEntity;
@RestController @RequestMapping("/api/v1/export")
public class ExportController { @GetMapping("/ping") public ResponseEntity<?> ping(){ return ResponseEntity.ok("ok"); } }
