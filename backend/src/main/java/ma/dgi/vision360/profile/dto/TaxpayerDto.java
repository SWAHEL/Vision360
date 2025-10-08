package ma.dgi.vision360.profile.dto;

import java.util.UUID;

/**
 * Flat DTO for sending taxpayer data to the frontend.
 * Field names are camelCase (frontend-friendly) while the entity uses snake_case.
 */
public class TaxpayerDto {
    private UUID id;

    private String identifiantFiscal; // entity: identifiant_fiscal
    private String ice;
    private String cin;
    private String nom;
    private String secteur;
    private String ville;
    private String adresse;
    private String telephone;
    private String category;
    private String dri;
    private String dip;
    private String imageUrl;
    // entity: image_url

    public TaxpayerDto() {}

    public TaxpayerDto(
            UUID id,
            String identifiantFiscal,
            String ice,
            String cin,
            String nom,
            String secteur,
            String ville,
            String adresse,
            String telephone,
            String category,
            String dri,
            String dip,
            String imageUrl
    ) {
        this.id = id;
        this.identifiantFiscal = identifiantFiscal;
        this.ice = ice;
        this.cin = cin;
        this.nom = nom;
        this.secteur = secteur;
        this.ville = ville;
        this.adresse = adresse;
        this.telephone = telephone;
        this.category = category;
        this.dri = dri;
        this.dip = dip;
        this.imageUrl = imageUrl;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getIdentifiantFiscal() { return identifiantFiscal; }
    public void setIdentifiantFiscal(String identifiantFiscal) { this.identifiantFiscal = identifiantFiscal; }

    public String getIce() { return ice; }
    public void setIce(String ice) { this.ice = ice; }

    public String getCin() { return cin; }
    public void setCin(String cin) { this.cin = cin; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getSecteur() { return secteur; }
    public void setSecteur(String secteur) { this.secteur = secteur; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDri() { return dri; }
    public void setDri(String dri) { this.dri = dri; }

    public String getDip() { return dip; }
    public void setDip(String dip) { this.dip = dip; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
