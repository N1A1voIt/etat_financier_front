package itu.vitafoam.actif;


import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "actif_immobilise")
public class ActifImmobilise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_actif_immobilise")
    private Long idActifImmobilise;

    @Column(name = "id_bilan")
    private Long idBilan;

    @Column(name = "immobilisations_corporelles")
    private BigDecimal immobilisationsCorporelles;

    @Column(name = "immobilisations_incorporelles")
    private BigDecimal immobilisationsIncorporelles;

    @Column(name = "immobilisations_financieres")
    private BigDecimal immobilisationsFinancieres;

    @Column(name = "autres_immobilisations")
    private BigDecimal autresImmobilisations;

    public BigDecimal sommerImmobilisation(){
        return BigDecimal.valueOf(
                this.getImmobilisationsCorporelles().doubleValue()
                + this.getImmobilisationsIncorporelles().doubleValue()
                + this.getImmobilisationsFinancieres().doubleValue()
                + this.getAutresImmobilisations().doubleValue()
        );
    }

    public Long getIdActifImmobilise() {
        return idActifImmobilise;
    }

    public void setIdActifImmobilise(Long idActifImmobilise) {
        this.idActifImmobilise = idActifImmobilise;
    }

    public Long getIdBilan() {
        return idBilan;
    }

    public void setIdBilan(Long idBilan) {
        this.idBilan = idBilan;
    }

    public BigDecimal getImmobilisationsCorporelles() {
        return immobilisationsCorporelles;
    }

    public void setImmobilisationsCorporelles(BigDecimal immobilisationsCorporelles) {
        this.immobilisationsCorporelles = immobilisationsCorporelles;
    }

    public BigDecimal getImmobilisationsIncorporelles() {
        return immobilisationsIncorporelles;
    }

    public void setImmobilisationsIncorporelles(BigDecimal immobilisationsIncorporelles) {
        this.immobilisationsIncorporelles = immobilisationsIncorporelles;
    }

    public BigDecimal getImmobilisationsFinancieres() {
        return immobilisationsFinancieres;
    }

    public void setImmobilisationsFinancieres(BigDecimal immobilisationsFinancieres) {
        this.immobilisationsFinancieres = immobilisationsFinancieres;
    }

    public BigDecimal getAutresImmobilisations() {
        return autresImmobilisations;
    }

    public void setAutresImmobilisations(BigDecimal autresImmobilisations) {
        this.autresImmobilisations = autresImmobilisations;
    }
}
