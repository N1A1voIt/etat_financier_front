package itu.vitafoam.bilan;
import jakarta.persistence.*;
import org.springframework.data.relational.core.sql.In;

import java.math.BigDecimal;

@Entity
@Table(name = "bilan")  // Explicit table name mapping
public class Bilan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBilan;

    @Column(name = "id_entreprise")
    private Long entreprise;

    @Column(name = "id_annee")
    private Long annee;

    @Column(nullable = false)
    private BigDecimal actifsCourants;

    @Column(nullable = false)
    private BigDecimal actifsImmobilises;

    @Column(nullable = false)
    private BigDecimal passifsCourants;

    @Column(nullable = false)
    private BigDecimal passifsNonCourants;

    @Column(nullable = false)
    private BigDecimal capitauxPropres;

    // Getters and Setters
    public Long getIdBilan() {
        return idBilan;
    }

    public void setIdBilan(Long idBilan) {
        this.idBilan = idBilan;
    }

    public Long getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(Long entreprise) {
        this.entreprise = entreprise;
    }

    public Long getAnnee() {
        return annee;
    }

    public void setAnnee(Long annee) {
        this.annee = annee;
    }

    public BigDecimal getActifsCourants() {
        return actifsCourants;
    }

    public void setActifsCourants(BigDecimal actifsCourants) {
        this.actifsCourants = actifsCourants;
    }

    public BigDecimal getActifsImmobilises() {
        return actifsImmobilises;
    }

    public void setActifsImmobilises(BigDecimal actifsImmobilises) {
        this.actifsImmobilises = actifsImmobilises;
    }

    public BigDecimal getPassifsCourants() {
        return passifsCourants;
    }

    public void setPassifsCourants(BigDecimal passifsCourants) {
        this.passifsCourants = passifsCourants;
    }

    public BigDecimal getPassifsNonCourants() {
        return passifsNonCourants;
    }

    public void setPassifsNonCourants(BigDecimal passifsNonCourants) {
        this.passifsNonCourants = passifsNonCourants;
    }

    public BigDecimal getCapitauxPropres() {
        return capitauxPropres;
    }

    public void setCapitauxPropres(BigDecimal capitauxPropres) {
        this.capitauxPropres = capitauxPropres;
    }
}