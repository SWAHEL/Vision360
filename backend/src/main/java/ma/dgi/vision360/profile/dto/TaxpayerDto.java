package ma.dgi.vision360.profile.dto;

import java.util.UUID;

public class TaxpayerDto {
    private UUID id;
    private String identifiantFiscal;
    private String ice;
    private String cin;
    private String nom;
    private String secteur;
    private String ville;

    public TaxpayerDto() {}

    public TaxpayerDto(UUID id, String identifiantFiscal, String ice, String cin,
                       String nom, String secteur, String ville) {
        this.id = id;
        this.identifiantFiscal = identifiantFiscal;
        this.ice = ice;
        this.cin = cin;
        this.nom = nom;
        this.secteur = secteur;
        this.ville = ville;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getIdentifiantFiscal() { return identifiantFiscal; }
    public void setIdentifiantFiscal(String v) { this.identifiantFiscal = v; }
    public String getIce() { return ice; }
    public void setIce(String v) { this.ice = v; }
    public String getCin() { return cin; }
    public void setCin(String v) { this.cin = v; }
    public String getNom() { return nom; }
    public void setNom(String v) { this.nom = v; }
    public String getSecteur() { return secteur; }
    public void setSecteur(String v) { this.secteur = v; }
    public String getVille() { return ville; }
    public void setVille(String v) { this.ville = v; }
}
