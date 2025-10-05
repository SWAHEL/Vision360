package ma.dgi.vision360.profile.mapper;

import ma.dgi.vision360.profile.dto.TaxpayerDto;
import ma.dgi.vision360.profile.entity.Taxpayer;

public class TaxpayerMapper {
    public static TaxpayerDto toDto(Taxpayer t) {
        return new TaxpayerDto(
                t.getId(),
                t.getIdentifiant_fiscal(),
                t.getIce(),
                t.getCin(),
                t.getNom(),
                t.getSecteur(),
                t.getVille()
        );
    }
}
