package itu.vitafoam.indicateurs;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "interpretations")
public class Interpretation {

    @Id
    @Column(name = "view_name")
    private String viewName;

    private BigDecimal resultat;

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public BigDecimal getResultat() {
        return resultat;
    }

    public void setResultat(BigDecimal resultat) {
        this.resultat = resultat;
    }
    public static BigDecimal getIndicateur(List<Interpretation> interpretations, String indicateur){
        for (Interpretation interpretation : interpretations) {
            if(interpretation.getViewName().equals(indicateur)){
                return interpretation.getResultat();
            }
        }
        return new BigDecimal(0);
    }
    public static String toString(List<Interpretation> interpretations) {
        return "{" +
                "\"margeNette\":" + Interpretation.getIndicateur(interpretations,"marge_nette") +
                ", \"resultatExpoloitation\":" + Interpretation.getIndicateur(interpretations,"resultat_exploitation") +
                ",\"couvertureInterets\":" + Interpretation.getIndicateur(interpretations,"couverture_interets") +
                ", \"retourSurActifs\":" + Interpretation.getIndicateur(interpretations,"ROA") +
                ", \"liquiditeGenerale\":" +  Interpretation.getIndicateur(interpretations,"liquidite_generale")  +
                ", \"liquiditeReduite\":" +  Interpretation.getIndicateur(interpretations,"ratio_liquidite_reduite")  +
                ", \"endettementGlobal\":" +  Interpretation.getIndicateur(interpretations,"ratio_endettement")  +
                ", \"levierFinancier\":" +  Interpretation.getIndicateur(interpretations,"levier_financier")  +
                ", \"returnOnEquity\":" +  Interpretation.getIndicateur(interpretations,"ROE")  +
                ", \"ROEavecEffetLevier\":" +  Interpretation.getIndicateur(interpretations,"ROE_avec_levier")  +
                '}';
    }
}
