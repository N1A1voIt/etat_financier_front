package itu.vitafoam.financialState;

import itu.vitafoam.actif.ActifCourant;
import itu.vitafoam.actif.ActifImmobilise;
import itu.vitafoam.passifs.CapitauxPropres;
import itu.vitafoam.passifs.Passif;
import itu.vitafoam.passifs.PassifNonCourant;
import org.springframework.data.relational.core.sql.In;

import java.math.BigDecimal;
import java.util.Objects;

public class FinancialForm {
    Long idEntreprise;
    Long idAnnee;
    Double immobilisationCorporelle;
    Double immobilisationIncorporelle;
    Double immobilisationFinanciere;
    Double autresImmobilisations;
    Double stocks;
    Double creancesClients;
    Double disponibilite;
    Double autresActifsCourant;
    Double capitalSocial;
    Double reserves;
    Double exoResult;
    Double autresCapitauxPropres;
    Double dettesFournisseurs;
    Double dettesFiscales;
    Double aPassifsCourants;
    Double emprunts;
    Double provisions;
    Double aPassifsNonCourants;

    // Getters and Setters
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

    public Double getImmobilisationCorporelle() {
        return immobilisationCorporelle;
    }

    public void setImmobilisationCorporelle(Double immobilisationCorporelle) {
        this.immobilisationCorporelle = immobilisationCorporelle;
    }

    public Double getImmobilisationIncorporelle() {
        return immobilisationIncorporelle;
    }

    public void setImmobilisationIncorporelle(Double immobilisationIncorporelle) {
        this.immobilisationIncorporelle = immobilisationIncorporelle;
    }

    public Double getImmobilisationFinanciere() {
        return immobilisationFinanciere;
    }

    public void setImmobilisationFinanciere(Double immobilisationFinanciere) {
        this.immobilisationFinanciere = immobilisationFinanciere;
    }

    public Double getAutresImmobilisations() {
        return autresImmobilisations;
    }

    public void setAutresImmobilisations(Double autresImmobilisations) {
        this.autresImmobilisations = autresImmobilisations;
    }

    public Double getStocks() {
        return stocks;
    }

    public void setStocks(Double stocks) {
        this.stocks = stocks;
    }

    public Double getCreancesClients() {
        return creancesClients;
    }

    public void setCreancesClients(Double creancesClients) {
        this.creancesClients = creancesClients;
    }

    public Double getDisponibilite() {
        return disponibilite;
    }

    public void setDisponibilite(Double disponibilite) {
        this.disponibilite = disponibilite;
    }

    public Double getAutresActifsCourant() {
        return autresActifsCourant;
    }

    public void setAutresActifsCourant(Double autresActifsCourant) {
        this.autresActifsCourant = autresActifsCourant;
    }

    public Double getCapitalSocial() {
        return capitalSocial;
    }

    public void setCapitalSocial(Double capitalSocial) {
        this.capitalSocial = capitalSocial;
    }

    public Double getReserves() {
        return reserves;
    }

    public void setReserves(Double reserves) {
        this.reserves = reserves;
    }

    public Double getExoResult() {
        return exoResult;
    }

    public void setExoResult(Double exoResult) {
        this.exoResult = exoResult;
    }

    public Double getAutresCapitauxPropres() {
        return autresCapitauxPropres;
    }

    public void setAutresCapitauxPropres(Double autresCapitauxPropres) {
        this.autresCapitauxPropres = autresCapitauxPropres;
    }

    public Double getDettesFournisseurs() {
        return dettesFournisseurs;
    }

    public void setDettesFournisseurs(Double dettesFournisseurs) {
        this.dettesFournisseurs = dettesFournisseurs;
    }

    public Double getDettesFiscales() {
        return dettesFiscales;
    }

    public void setDettesFiscales(Double dettesFiscales) {
        this.dettesFiscales = dettesFiscales;
    }

    public Double getaPassifsCourants() {
        return aPassifsCourants;
    }

    public void setaPassifsCourants(Double aPassifsCourants) {
        this.aPassifsCourants = aPassifsCourants;
    }

    public Double getEmprunts() {
        return emprunts;
    }

    public void setEmprunts(Double emprunts) {
        this.emprunts = emprunts;
    }

    public Double getProvisions() {
        return provisions;
    }

    public void setProvisions(Double provisions) {
        this.provisions = provisions;
    }

    public Double getaPassifsNonCourants() {
        return aPassifsNonCourants;
    }

    public void setaPassifsNonCourants(Double aPassifsNonCourants) {
        this.aPassifsNonCourants = aPassifsNonCourants;
    }



    public ActifImmobilise toActifImmobilise() {
        ActifImmobilise actifImmobilise = new ActifImmobilise();
        actifImmobilise.setImmobilisationsCorporelles(BigDecimal.valueOf(Objects.requireNonNullElse(immobilisationCorporelle, 0.0)));
        actifImmobilise.setImmobilisationsIncorporelles(BigDecimal.valueOf(Objects.requireNonNullElse(immobilisationIncorporelle, 0.0)));
        actifImmobilise.setImmobilisationsFinancieres(BigDecimal.valueOf(Objects.requireNonNullElse(immobilisationFinanciere, 0.0)));
        actifImmobilise.setAutresImmobilisations(BigDecimal.valueOf(Objects.requireNonNullElse(autresImmobilisations, 0.0)));
        return actifImmobilise;
    }

    public ActifCourant toActifCourant() {
        ActifCourant actifCourant = new ActifCourant();
        actifCourant.setStocks(BigDecimal.valueOf(Objects.requireNonNullElse(stocks, 0.0)));
        actifCourant.setCreancesClients(BigDecimal.valueOf(Objects.requireNonNullElse(creancesClients, 0.0)));
        actifCourant.setDisponibilites(BigDecimal.valueOf(Objects.requireNonNullElse(disponibilite, 0.0)));
        actifCourant.setAutresActifsCourants(BigDecimal.valueOf(Objects.requireNonNullElse(autresActifsCourant, 0.0)));
        return actifCourant;
    }

    public CapitauxPropres toCapitauxPropres() {
        CapitauxPropres capitauxPropres = new CapitauxPropres();
        capitauxPropres.setCapitalSocial(BigDecimal.valueOf(Objects.requireNonNullElse(capitalSocial, 0.0)));
        capitauxPropres.setReserves(BigDecimal.valueOf(Objects.requireNonNullElse(reserves, 0.0)));
        capitauxPropres.setResultatExercice(BigDecimal.valueOf(Objects.requireNonNullElse(exoResult, 0.0)));
        capitauxPropres.setAutresCapitauxPropres(BigDecimal.valueOf(Objects.requireNonNullElse(autresCapitauxPropres, 0.0)));
        return capitauxPropres;
    }

    public Passif toPassif() {
        Passif passif = new Passif();
        passif.setDettesFournisseurs(BigDecimal.valueOf(Objects.requireNonNullElse(dettesFournisseurs, 0.0)));
        passif.setDettesFiscales(BigDecimal.valueOf(Objects.requireNonNullElse(dettesFiscales, 0.0)));
        passif.setAutresPassifsCourants(BigDecimal.valueOf(Objects.requireNonNullElse(aPassifsCourants, 0.0)));
        return passif;
    }

    public PassifNonCourant toPassifNonCourant() {
        PassifNonCourant passifNonCourant = new PassifNonCourant();
        passifNonCourant.setEmprunts(BigDecimal.valueOf(Objects.requireNonNullElse(emprunts, 0.0)));
        passifNonCourant.setProvisions(BigDecimal.valueOf(Objects.requireNonNullElse(provisions, 0.0)));
        passifNonCourant.setAutresPassifsNonCourants(BigDecimal.valueOf(Objects.requireNonNullElse(aPassifsNonCourants, 0.0)));
        return passifNonCourant;
    }
}
