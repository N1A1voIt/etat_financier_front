package itu.vitafoam.compteResultat;

import java.math.BigDecimal;

public class CompteResultatCplRow {
    String label;
    BigDecimal amount;
    Boolean isBold;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Boolean getBold() {
        return isBold;
    }

    public void setBold(Boolean bold) {
        isBold = bold;
    }
}
