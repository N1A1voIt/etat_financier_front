package itu.vitafoam.indicateur;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Interpretations {
    @JsonProperty("id_entreprise")
    private int idEntreprise;

    @JsonProperty("id_annee")
    private int idAnnee;

    @JsonProperty("marge_nette")
    private double margeNette;

    @JsonProperty("retour_sur_actifs")
    private double retourSurActifs;

    @JsonProperty("ratio_liquidite_generale")
    private double ratioLiquiditeGenerale;

    @JsonProperty("ratio_liquidite_reduite")
    private double ratioLiquiditeReduite;

    @JsonProperty("ratio_endettement_global")
    private double ratioEndettementGlobal;

    @JsonProperty("couverture_interets")
    private double couvertureInterets;

    public int getIdEntreprise() {
        return idEntreprise;
    }

    public void setIdEntreprise(int idEntreprise) {
        this.idEntreprise = idEntreprise;
    }

    public int getIdAnnee() {
        return idAnnee;
    }

    public void setIdAnnee(int idAnnee) {
        this.idAnnee = idAnnee;
    }

    public double getMargeNette() {
        return margeNette;
    }

    public void setMargeNette(double margeNette) {
        this.margeNette = margeNette;
    }

    public double getRetourSurActifs() {
        return retourSurActifs;
    }

    public void setRetourSurActifs(double retourSurActifs) {
        this.retourSurActifs = retourSurActifs;
    }

    public double getRatioLiquiditeGenerale() {
        return ratioLiquiditeGenerale;
    }

    public void setRatioLiquiditeGenerale(double ratioLiquiditeGenerale) {
        this.ratioLiquiditeGenerale = ratioLiquiditeGenerale;
    }

    public double getRatioLiquiditeReduite() {
        return ratioLiquiditeReduite;
    }

    public void setRatioLiquiditeReduite(double ratioLiquiditeReduite) {
        this.ratioLiquiditeReduite = ratioLiquiditeReduite;
    }

    public double getRatioEndettementGlobal() {
        return ratioEndettementGlobal;
    }

    public void setRatioEndettementGlobal(double ratioEndettementGlobal) {
        this.ratioEndettementGlobal = ratioEndettementGlobal;
    }

    public double getCouvertureInterets() {
        return couvertureInterets;
    }

    public void setCouvertureInterets(double couvertureInterets) {
        this.couvertureInterets = couvertureInterets;
    }
}
