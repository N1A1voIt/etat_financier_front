package itu.vitafoam.compteResultat;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CompteResultatCpl {
    List<CompteResultatCplRow> compteResultatCplRows;

    public void addLabelAmmount(String label,BigDecimal amount,Boolean isBold){
        if (this.compteResultatCplRows == null) this.compteResultatCplRows = new ArrayList<>();
        CompteResultatCplRow compteResultatCplRow = new CompteResultatCplRow();
        compteResultatCplRow.setLabel(label);
        compteResultatCplRow.setAmount(amount);
        compteResultatCplRow.setBold(isBold);
        this.compteResultatCplRows.add(compteResultatCplRow);
    }

    public List<CompteResultatCplRow> getCompteResultatCplRows() {
        return compteResultatCplRows;
    }

    public void setCompteResultatCplRows(List<CompteResultatCplRow> compteResultatCplRows) {
        this.compteResultatCplRows = compteResultatCplRows;
    }
}
