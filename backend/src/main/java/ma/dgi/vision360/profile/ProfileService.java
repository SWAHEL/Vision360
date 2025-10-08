package ma.dgi.vision360.profile;

import lombok.RequiredArgsConstructor;
import ma.dgi.vision360.profile.dto.TaxpayerDto;
import ma.dgi.vision360.profile.entity.Taxpayer;
import ma.dgi.vision360.profile.mapper.TaxpayerMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final TaxpayerRepository repo;

    /** Fetch one taxpayer by ID (DTO for the frontend). */
    public TaxpayerDto getById(UUID id) {
        Taxpayer t = repo.findById(id).orElseThrow();
        return TaxpayerMapper.toDto(t);
    }

    /** Fetch one taxpayer by Identifiant Fiscal (handy for deep-linking). */
    public TaxpayerDto getByIdentifiantFiscal(String identifiantFiscal) {
        Taxpayer t = repo.findByIdentifiantFiscal(identifiantFiscal)
                .orElseThrow(() -> new IllegalArgumentException("Unknown identifiant_fiscal: " + identifiantFiscal));
        return TaxpayerMapper.toDto(t);
    }

    /** Paginated list (for tables). */
    public Page<TaxpayerDto> list(Pageable pageable) {
        return repo.findAll(pageable).map(TaxpayerMapper::toDto);
    }

    /**
     * Text search across nom / identifiant_fiscal / ice / cin (paginated).
     * Returns an empty page if q is null/blank.
     */
    public Page<TaxpayerDto> search(String q, Pageable pageable) {
        if (q == null || q.isBlank()) {
            return Page.empty(pageable);
        }
        return repo.search(q.trim(), pageable).map(TaxpayerMapper::toDto);
    }
}
