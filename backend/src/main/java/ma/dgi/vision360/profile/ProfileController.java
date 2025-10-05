package ma.dgi.vision360.profile;

import ma.dgi.vision360.profile.entity.Taxpayer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {
  private final TaxpayerRepository repo;

  @GetMapping("/{id}")
  public Taxpayer get(@PathVariable java.util.UUID id) {
    return repo.findById(id).orElseThrow();
  }
}
