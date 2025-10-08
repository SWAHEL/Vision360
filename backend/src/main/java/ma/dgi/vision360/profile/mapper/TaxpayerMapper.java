package ma.dgi.vision360.profile.mapper;

import ma.dgi.vision360.profile.dto.TaxpayerDto;
import ma.dgi.vision360.profile.entity.Taxpayer;

/**
 * Simple manual mapper. Uses your entity's snake_case getters.
 */
public final class TaxpayerMapper {

    private TaxpayerMapper() {}

    public static TaxpayerDto toDto(Taxpayer t) {
        if (t == null) return null;
        return new TaxpayerDto(
                t.getId(),
                t.getIdentifiant_fiscal(), // snake_case on entity
                t.getIce(),
                t.getCin(),
                t.getNom(),
                t.getSecteur(),
                t.getVille(),
                t.getAdresse(),
                t.getTelephone(),
                t.getCategory(),
                t.getDri(),
                t.getDip(),
                t.getImage_url()          // snake_case on entity
        );
    }

    /** Optional: map DTO back into an existing entity (for updates). */
    public static void copyToEntity(TaxpayerDto dto, Taxpayer e) {
        if (dto == null || e == null) return;
        e.setIdentifiant_fiscal(dto.getIdentifiantFiscal());
        e.setIce(dto.getIce());
        e.setCin(dto.getCin());
        e.setNom(dto.getNom());
        e.setSecteur(dto.getSecteur());
        e.setVille(dto.getVille());
        e.setAdresse(dto.getAdresse());
        e.setTelephone(dto.getTelephone());
        e.setCategory(dto.getCategory());
        e.setDri(dto.getDri());
        e.setDip(dto.getDip());
        e.setImage_url(dto.getImageUrl());
    }
}
