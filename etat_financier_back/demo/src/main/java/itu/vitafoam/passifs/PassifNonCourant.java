package itu.vitafoam.passifs;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "passif_non_courant")
public class PassifNonCourant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_passif_non_courant")
    private Long idPassifNonCourant;

    @Column(name = "id_bilan")
    private Long idBilan;

    @Column(name = "emprunts")
    private BigDecimal emprunts;

    @Column(name = "provisions")
    private BigDecimal provisions;

    @Column(name = "autres_passifs_non_courants")
    private BigDecimal autresPassifsNonCourants;

    // Getters and setters
    public BigDecimal sommerPassifNonCourant(){
        return BigDecimal.valueOf(
            this.getEmprunts().doubleValue()
            + this.getProvisions().doubleValue()
            + this.getAutresPassifsNonCourants().doubleValue()
        );
    }

    public Long getIdPassifNonCourant() {
        return idPassifNonCourant;
    }

    public void setIdPassifNonCourant(Long idPassifNonCourant) {
        this.idPassifNonCourant = idPassifNonCourant;
    }

    public Long getIdBilan() {
        return idBilan;
    }

    public void setIdBilan(Long idBilan) {
        this.idBilan = idBilan;
    }

    public BigDecimal getEmprunts() {
        return emprunts;
    }

    public void setEmprunts(BigDecimal emprunts) {
        this.emprunts = emprunts;
    }

    public BigDecimal getProvisions() {
        return provisions;
    }

    public void setProvisions(BigDecimal provisions) {
        this.provisions = provisions;
    }

    public BigDecimal getAutresPassifsNonCourants() {
        return autresPassifsNonCourants;
    }

    public void setAutresPassifsNonCourants(BigDecimal autresPassifsNonCourants) {
        this.autresPassifsNonCourants = autresPassifsNonCourants;
    }
}