package itu.vitafoam.rubrique;

import java.util.List;

public class BilanResponse {
    List<RubriqueCpl> rubriques;
    boolean estEquilibre;

    public List<RubriqueCpl> getRubriques() {
        return rubriques;
    }

    public void setRubriques(List<RubriqueCpl> rubriques) {
        this.rubriques = rubriques;
    }

    public boolean isEstEquilibre() {
        return estEquilibre;
    }

    public void setEstEquilibre(boolean estEquilibre) {
        this.estEquilibre = estEquilibre;
    }
}
