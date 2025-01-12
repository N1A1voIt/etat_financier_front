package itu.vitafoam.rubrique;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class SpecialAmount {
    @JsonProperty("montant")
    BigDecimal montant;

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public SpecialAmount() {
    }

    public SpecialAmount(BigDecimal montant) {
        this.montant = montant;
    }
}
