package itu.vitafoam.compte_resultat;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "compte_resultat")
public class CompteResultat {
    @Id
    @Column(name = "id_rubrique")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long idRubrique;
    @Column(name = "rubrique")
    String rubrique;
    @Column(name = "est_important")
    Boolean estImportant;
    @Column(name = "montant")
    BigDecimal montant;
    @Column(name = "numero_section")
    Integer numeroSection;

    public Long getIdRubrique() {
        return idRubrique;
    }

    public void setIdRubrique(Long idRubrique) {
        this.idRubrique = idRubrique;
    }

    public String getRubrique() {
        return rubrique;
    }

    public void setRubrique(String rubrique) {
        this.rubrique = rubrique;
    }

    public Boolean getEstImportant() {
        return estImportant;
    }

    public void setEstImportant(Boolean estImportant) {
        this.estImportant = estImportant;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public Integer getNumeroSection() {
        return numeroSection;
    }

    public void setNumeroSection(Integer numeroSection) {
        this.numeroSection = numeroSection;
    }
}
