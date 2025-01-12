package itu.vitafoam;

import java.math.BigDecimal;

public class FinancialItemDTO {
    private String label;
    private BigDecimal amount;
    private boolean isBold = false;

    public FinancialItemDTO(String label, BigDecimal amount) {
        this.label = label;
        this.amount = amount;
    }

    public FinancialItemDTO(){}

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

    public boolean isBold() {
        return isBold;
    }

    public void setBold(boolean bold) {
        isBold = bold;
    }
}

