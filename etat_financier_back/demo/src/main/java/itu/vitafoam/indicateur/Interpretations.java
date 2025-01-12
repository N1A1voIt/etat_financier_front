package itu.vitafoam.indicateur;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class Interpretations {
    @JsonProperty("id_entreprise")
    private Integer idEntreprise;

    @JsonProperty("id_annee")
    private Integer idAnnee;

    @JsonProperty("marge_nette")
    private BigDecimal margeNette;

    @JsonProperty("retour_sur_actifs")
    private BigDecimal retourSurActifs;

    @JsonProperty("ratio_liquidite_generale")
    private BigDecimal ratioLiquiditeGenerale;

    @JsonProperty("ratio_liquidite_reduite")
    private BigDecimal ratioLiquiditeReduite;

    @JsonProperty("ratio_endettement_global")
    private BigDecimal ratioEndettementGlobal;

    @JsonProperty("couverture_Integererets")
    private BigDecimal couvertureInterets;

    public Integer getIdEntreprise() {
        return idEntreprise;
    }

    public void setIdEntreprise(Integer idEntreprise) {
        this.idEntreprise = idEntreprise;
    }

    public Integer getIdAnnee() {
        return idAnnee;
    }

    public void setIdAnnee(Integer idAnnee) {
        this.idAnnee = idAnnee;
    }

    public BigDecimal getMargeNette() {
        return margeNette;
    }

    public void setMargeNette(BigDecimal margeNette) {
        this.margeNette = margeNette;
    }

    public BigDecimal getRetourSurActifs() {
        return retourSurActifs;
    }

    public void setRetourSurActifs(BigDecimal retourSurActifs) {
        this.retourSurActifs = retourSurActifs;
    }

    public BigDecimal getRatioLiquiditeGenerale() {
        return ratioLiquiditeGenerale;
    }

    public void setRatioLiquiditeGenerale(BigDecimal ratioLiquiditeGenerale) {
        this.ratioLiquiditeGenerale = ratioLiquiditeGenerale;
    }

    public BigDecimal getRatioLiquiditeReduite() {
        return ratioLiquiditeReduite;
    }

    public void setRatioLiquiditeReduite(BigDecimal ratioLiquiditeReduite) {
        this.ratioLiquiditeReduite = ratioLiquiditeReduite;
    }

    public BigDecimal getRatioEndettementGlobal() {
        return ratioEndettementGlobal;
    }

    public void setRatioEndettementGlobal(BigDecimal ratioEndettementGlobal) {
        this.ratioEndettementGlobal = ratioEndettementGlobal;
    }

    public BigDecimal getCouvertureInterets() {
        return couvertureInterets;
    }

    public void setCouvertureInterets(BigDecimal couvertureInterets) {
        this.couvertureInterets = couvertureInterets;
    }

    @Override
    public String toString() {
        return "{" +
                "\"idEntreprise\":" + idEntreprise +
                ", \"idAnnee\":" + idAnnee +
                ",\"margeNette\":" + margeNette +
                ", \"retourSurActifs\":" + retourSurActifs +
                ", \"ratioLiquiditeGenerale\":" + ratioLiquiditeGenerale +
                ", \"ratioLiquiditeReduite\":" + ratioLiquiditeReduite +
                ", \"ratioEndettementGlobal\":" + ratioEndettementGlobal +
                ", \"couvertureInterets\":" + couvertureInterets +
                '}';
    }

    public Interpretations(Integer idEntreprise, Integer idAnnee, BigDecimal margeNette, BigDecimal retourSurActifs, BigDecimal ratioLiquiditeGenerale, BigDecimal ratioLiquiditeReduite, BigDecimal ratioEndettementGlobal, BigDecimal couvertureInterets) {
        this.idEntreprise = idEntreprise;
        this.idAnnee = idAnnee;
        this.margeNette = margeNette;
        this.retourSurActifs = retourSurActifs;
        this.ratioLiquiditeGenerale = ratioLiquiditeGenerale;
        this.ratioLiquiditeReduite = ratioLiquiditeReduite;
        this.ratioEndettementGlobal = ratioEndettementGlobal;
        this.couvertureInterets = couvertureInterets;
    }
}
