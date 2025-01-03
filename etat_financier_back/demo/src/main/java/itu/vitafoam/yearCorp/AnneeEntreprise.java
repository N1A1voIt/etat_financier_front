package itu.vitafoam.yearCorp;

import itu.vitafoam.annee.Annee;
import itu.vitafoam.entreprise.Entreprise;

public class AnneeEntreprise {
    Entreprise[] entreprises;
    Annee[] annees;

    public Entreprise[] getEntreprises() {
        return entreprises;
    }

    public void setEntreprises(Entreprise[] entreprises) {
        this.entreprises = entreprises;
    }

    public Annee[] getAnnees() {
        return annees;
    }

    public void setAnnees(Annee[] annees) {
        this.annees = annees;
    }
}
