package itu.vitafoam.compteResultat;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "compte_resultat")
public class CompteResultat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compte_resultat")
    private Long idCompteResultat;

    @Column(name = "id_entreprise", nullable = false)
    private Long idEntreprise;

    @Column(name = "id_annee", nullable = false)
    private Long idAnnee;

    @Column(name = "revenus", nullable = false, precision = 15, scale = 2)
    private BigDecimal revenus;

    @Column(name = "charges_exploitation", nullable = false, precision = 15, scale = 2)
    private BigDecimal chargesExploitation;

    @Column(name = "charges_financieres", nullable = false, precision = 15, scale = 2)
    private BigDecimal chargesFinancieres;

    @Column(name = "impots", nullable = false, precision = 15, scale = 2)
    private BigDecimal impots;

    @Column(name = "resultat_net", nullable = false, precision = 15, scale = 2, insertable = false, updatable = false)
    private BigDecimal resultatNet;

    @Column(name = "resultat_exploitation", nullable = false, precision = 15, scale = 2, insertable = false, updatable = false)
    private BigDecimal resultatExploitation;

    // Getters and Setters

    public Long getIdCompteResultat() {
        return idCompteResultat;
    }

    public void setIdCompteResultat(Long idCompteResultat) {
        this.idCompteResultat = idCompteResultat;
    }

    public Long getIdEntreprise() {
        return idEntreprise;
    }

    public void setIdEntreprise(Long idEntreprise) {
        this.idEntreprise = idEntreprise;
    }

    public Long getIdAnnee() {
        return idAnnee;
    }

    public void setIdAnnee(Long idAnnee) {
        this.idAnnee = idAnnee;
    }

    public BigDecimal getRevenus() {
        return revenus;
    }

    public void setRevenus(BigDecimal revenus) {
        this.revenus = revenus;
    }

    public BigDecimal getChargesExploitation() {
        return chargesExploitation;
    }

    public void setChargesExploitation(BigDecimal chargesExploitation) {
        this.chargesExploitation = chargesExploitation;
    }

    public BigDecimal getChargesFinancieres() {
        return chargesFinancieres;
    }

    public void setChargesFinancieres(BigDecimal chargesFinancieres) {
        this.chargesFinancieres = chargesFinancieres;
    }

    public BigDecimal getImpots() {
        return impots;
    }

    public void setImpots(BigDecimal impots) {
        this.impots = impots;
    }

    public BigDecimal getResultatNet() {
        return resultatNet;
    }

    public void setResultatNet(BigDecimal resultatNet) {
        this.resultatNet = resultatNet;
    }

    public BigDecimal getResultatExploitation() {
        return resultatExploitation;
    }

    public void setResultatExploitation(BigDecimal resultatExploitation) {
        this.resultatExploitation = resultatExploitation;
    }

    @Override
    public String toString() {
        return "CompteResultat{" +
                "idCompteResultat=" + idCompteResultat +
                ", idEntreprise=" + idEntreprise +
                ", idAnnee=" + idAnnee +
                ", revenus=" + revenus +
                ", chargesExploitation=" + chargesExploitation +
                ", chargesFinancieres=" + chargesFinancieres +
                ", impots=" + impots +
                ", resultatNet=" + resultatNet +
                ", resultatExploitation=" + resultatExploitation +
                '}';
    }
}