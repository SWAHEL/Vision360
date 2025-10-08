package ma.dgi.vision360.profile;

import lombok.RequiredArgsConstructor;
import ma.dgi.vision360.profile.dto.TaxpayerDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/profiles")
@RequiredArgsConstructor
public class ProfileController {

  private final ProfileService service;

  @GetMapping("/{id}")
  public TaxpayerDto get(@PathVariable UUID id) {
    return service.getById(id);
  }

  @GetMapping("/by-if/{identifiantFiscal}")
  public TaxpayerDto getByIF(@PathVariable String identifiantFiscal) {
    return service.getByIdentifiantFiscal(identifiantFiscal);
  }

  @GetMapping
  public Page<TaxpayerDto> list(Pageable pageable) {
    return service.list(pageable);
  }

  @GetMapping("/search")
  public Page<TaxpayerDto> search(@RequestParam("q") String q, Pageable pageable) {
    return service.search(q, pageable);
  }
}
