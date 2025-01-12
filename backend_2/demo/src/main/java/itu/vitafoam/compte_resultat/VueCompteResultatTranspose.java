package itu.vitafoam.compte_resultat;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "vue_compte_resultat_transpose")
public class VueCompteResultatTranspose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rubriques")
    private String rubriques;

    @Column(name = "montant", precision = 18, scale = 2)
    private BigDecimal montant;

    @Column(name = "isimportant")
    private Boolean isImportant;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRubriques() {
        return rubriques;
    }

    public void setRubriques(String rubriques) {
        this.rubriques = rubriques;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public Boolean getIsImportant() {
        return isImportant;
    }

    public void setIsImportant(Boolean isImportant) {
        this.isImportant = isImportant;
    }
}