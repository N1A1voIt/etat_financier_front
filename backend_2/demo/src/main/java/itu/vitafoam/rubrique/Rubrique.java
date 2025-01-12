package itu.vitafoam.rubrique;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "rubriques")
public class Rubrique {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rubrique")
    Long idRubrique;
    @Column(name = "rubrique")
    String rubrique;
    @Column(name = "montant")
    BigDecimal montant;
    @Column(name = "n_compte")
    String nCompte;
    @Column(name = "id_rubrique_mere")
    Long idRubriqueMere;
    @Column(name = "id_type")
    Long idType;

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

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public String getnCompte() {
        return nCompte;
    }

    public void setnCompte(String nCompte) {
        this.nCompte = nCompte;
    }

    public Long getIdType() {
        return idType;
    }

    public void setIdType(Long idType) {
        this.idType = idType;
    }

    public Long getIdRubriqueMere() {
        return idRubriqueMere;
    }

    public void setIdRubriqueMere(Long idRubriqueMere) {
        this.idRubriqueMere = idRubriqueMere;
    }
}
