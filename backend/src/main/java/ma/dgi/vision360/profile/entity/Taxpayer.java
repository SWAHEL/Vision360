package ma.dgi.vision360.profile.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "taxpayer")
public class Taxpayer {
  @Id @GeneratedValue
  private UUID id;

  private String identifiant_fiscal;
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
  private String image_url;

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public String getIdentifiant_fiscal() { return identifiant_fiscal; }
  public void setIdentifiant_fiscal(String v) { this.identifiant_fiscal = v; }
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
  public String getAdresse() { return adresse; }
  public void setAdresse(String v) { this.adresse = v; }
  public String getTelephone() { return telephone; }
  public void setTelephone(String v) { this.telephone = v; }
  public String getCategory() { return category; }
  public void setCategory(String v) { this.category = v; }
  public String getDri() { return dri; }
  public void setDri(String v) { this.dri = v; }
  public String getDip() { return dip; }
  public void setDip(String v) { this.dip = v; }
  public String getImage_url() { return image_url; }
  public void setImage_url(String v) { this.image_url = v; }
}
