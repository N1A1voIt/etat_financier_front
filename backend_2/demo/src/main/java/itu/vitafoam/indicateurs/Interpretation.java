package itu.vitafoam.indicateurs;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "interpretations")
public class Interpretation {

    @Id
    @Column(name = "view_name")
    private String viewName;

    private double resultat;

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public double getResultat() {
        return resultat;
    }

    public void setResultat(double resultat) {
        this.resultat = resultat;
    }
    public static double getIndicateur(List<Interpretation> interpretations,String indicateur){
        for (Interpretation interpretation : interpretations) {
            if(interpretation.getViewName().equals(indicateur)){
                return interpretation.getResultat();
            }
        }
    }
}
