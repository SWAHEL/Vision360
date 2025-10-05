package ma.dgi.vision360.search.dto;

public class SearchItem {
    private String id;
    private String identifiantFiscal;
    private String ice;
    private String cin;
    private String nom;
    private String secteur;
    private String ville;
    private String imageUrl;

    public SearchItem() {}

    public SearchItem(String id, String identifiantFiscal, String ice, String cin,
                      String nom, String secteur, String ville, String imageUrl) {
        this.id = id; this.identifiantFiscal = identifiantFiscal; this.ice = ice; this.cin = cin;
        this.nom = nom; this.secteur = secteur; this.ville = ville; this.imageUrl = imageUrl;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
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
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
