package itu.vitafoam.annee;

import jakarta.persistence.*;

@Entity
@Table(name = "annee")  // Explicit table name mapping
public class Annee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnnee;

    @Column(nullable = false, unique = true)
    private Integer annee;

    // Getters and Setters
    public Long getIdAnnee() {
        return idAnnee;
    }

    public void setIdAnnee(Long idAnnee) {
        this.idAnnee = idAnnee;
    }

    public Integer getAnnee() {
        return annee;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }
}
