package itu.vitafoam.passifs;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "capitaux_propres")
public class CapitauxPropres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_capitaux_propres")
    private Long idCapitauxPropres;

    @Column(name = "id_bilan")
    private Long idBilan;

    @Column(name = "capital_social")
    private BigDecimal capitalSocial;

    @Column(name = "reserves")
    private BigDecimal reserves;

    @Column(name = "resultat_exercice")
    private BigDecimal resultatExercice;

    @Column(name = "autres_capitaux_propres")
    private BigDecimal autresCapitauxPropres;

    public BigDecimal sommerCapitauxPropres(){
        return BigDecimal.valueOf(
                this.getCapitalSocial().doubleValue()
                + this.getReserves().doubleValue()
                + this.getResultatExercice().doubleValue()
                + this.getAutresCapitauxPropres().doubleValue()
        );
    }

    public Long getIdCapitauxPropres() {
        return idCapitauxPropres;
    }

    public void setIdCapitauxPropres(Long idCapitauxPropres) {
        this.idCapitauxPropres = idCapitauxPropres;
    }

    public Long getIdBilan() {
        return idBilan;
    }

    public void setIdBilan(Long idBilan) {
        this.idBilan = idBilan;
    }

    public BigDecimal getCapitalSocial() {
        return capitalSocial;
    }

    public void setCapitalSocial(BigDecimal capitalSocial) {
        this.capitalSocial = capitalSocial;
    }

    public BigDecimal getReserves() {
        return reserves;
    }

    public void setReserves(BigDecimal reserves) {
        this.reserves = reserves;
    }

    public BigDecimal getResultatExercice() {
        return resultatExercice;
    }

    public void setResultatExercice(BigDecimal resultatExercice) {
        this.resultatExercice = resultatExercice;
    }

    public BigDecimal getAutresCapitauxPropres() {
        return autresCapitauxPropres;
    }

    public void setAutresCapitauxPropres(BigDecimal autresCapitauxPropres) {
        this.autresCapitauxPropres = autresCapitauxPropres;
    }

    // Getters and setters
}