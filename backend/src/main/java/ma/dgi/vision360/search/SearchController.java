package ma.dgi.vision360.search;

import ma.dgi.vision360.search.dto.SearchItem;      // <-- add this
import ma.dgi.vision360.search.dto.SearchRequest;   // <-- and this (if you use SearchRequest)
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    private final SearchService service;

    public SearchController(SearchService service) {
        this.service = service;
    }

    // GET /api/v1/search?q=&ville=&secteur=&size=
    @GetMapping
    public ResponseEntity<List<SearchItem>> searchGet(@ModelAttribute SearchRequest req) throws IOException {
        int size = (req.size() == null || req.size() <= 0 || req.size() > 100) ? 30 : req.size();
        return ResponseEntity.ok(service.search(req.q(), req.ville(), req.secteur(), size));
    }

    // POST /api/v1/search  (JSON)
    @PostMapping(consumes = "application/json")
    public ResponseEntity<List<SearchItem>> searchPost(@RequestBody SearchRequest req) throws IOException {
        int size = (req.size() == null || req.size() <= 0 || req.size() > 100) ? 30 : req.size();
        return ResponseEntity.ok(service.search(req.q(), req.ville(), req.secteur(), size));
    }
}
