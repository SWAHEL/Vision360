package ma.dgi.vision360.graph;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/v1/graph", produces = MediaType.APPLICATION_JSON_VALUE)
// @CrossOrigin(origins = "http://localhost:5173") // enable if frontend runs on Vite in dev
public class GraphController {

    private final GraphService graphService;

    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    /** GET /api/v1/graph/all?limit=2000 -> {nodes, edges} */
    @GetMapping("/all")
    public ResponseEntity<?> fullGraph(@RequestParam(defaultValue = "2000") int limit) {
        try {
            if (limit < 100) limit = 100;
            if (limit > 20000) limit = 20000;
            return ResponseEntity.ok(graphService.fullGraph(limit));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error","Failed to export full graph", "details", e.getMessage()));
        }
    }

    /** GET /api/v1/graph/company/{key} -> company card */
    @GetMapping("/company/{key}")
    public ResponseEntity<?> company(@PathVariable String key) {
        try {
            if (key == null || key.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error","Path variable 'key' is required"));
            }
            return ResponseEntity.ok(graphService.companyCard(key));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error","Failed to fetch company card", "details", e.getMessage()));
        }
    }

    /** GET /api/v1/graph/neighbors?id=companies/RENACO&depth=1&direction=ANY&includeVertices=false&limit=200 */
    @GetMapping("/neighbors")
    public ResponseEntity<?> neighbors(
            @RequestParam("id") String id,
            @RequestParam(value = "depth", defaultValue = "1") int depth,
            @RequestParam(value = "direction", defaultValue = "ANY") String direction,
            @RequestParam(value = "includeVertices", defaultValue = "false") boolean includeVertices,
            @RequestParam(value = "limit", defaultValue = "200") int limit
    ) {
        try {
            if (id == null || id.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Parameter 'id' is required"));
            }
            if (depth < 1) depth = 1;
            if (limit < 1) limit = 1;
            if (limit > 5000) limit = 5000;

            String dir = direction == null ? "ANY" : direction.toUpperCase(Locale.ROOT);
            if (!dir.equals("ANY") && !dir.equals("OUTBOUND") && !dir.equals("INBOUND")) dir = "ANY";

            return ResponseEntity.ok(graphService.neighbors(id, depth, dir, includeVertices, limit));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error","Failed to fetch neighbors", "details", e.getMessage()));
        }
    }

    /** helper for quick checks */
    @GetMapping("/counts")
    public ResponseEntity<?> counts() {
        return ResponseEntity.ok(graphService.counts());
    }
}
