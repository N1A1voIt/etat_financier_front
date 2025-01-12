package itu.vitafoam.rubrique;

import java.util.List;

public class BilanResponse {
    List<RubriqueCpl> actifs;
    List<RubriqueCpl> passifs;
    boolean estEquilibre;

    public List<RubriqueCpl> getActifs() {
        return actifs;
    }

    public void setActifs(List<RubriqueCpl> actifs) {
        this.actifs = actifs;
    }

    public List<RubriqueCpl> getPassifs() {
        return passifs;
    }

    public void setPassifs(List<RubriqueCpl> passifs) {
        this.passifs = passifs;
    }

    public boolean isEstEquilibre() {
        return estEquilibre;
    }

    public void setEstEquilibre(boolean estEquilibre) {
        this.estEquilibre = estEquilibre;
    }
}
