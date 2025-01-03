package itu.vitafoam.passifs;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "passif")
public class Passif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_passif")
    private Long idPassif;

    @Column(name = "id_bilan")
    private Long idBilan;

    @Column(name = "dettes_fournisseurs")
    private BigDecimal dettesFournisseurs;

    @Column(name = "dettes_fiscales")
    private BigDecimal dettesFiscales;

    @Column(name = "autres_passifs_courants")
    private BigDecimal autresPassifsCourants;

    public BigDecimal sommerDettes(){
        return BigDecimal.valueOf(
            this.getDettesFournisseurs().doubleValue()
            + this.getDettesFiscales().doubleValue()
            + this.getAutresPassifsCourants().doubleValue()
        );
    }

    public Long getIdPassif() {
        return idPassif;
    }

    public void setIdPassif(Long idPassif) {
        this.idPassif = idPassif;
    }

    public Long getIdBilan() {
        return idBilan;
    }

    public void setIdBilan(Long idBilan) {
        this.idBilan = idBilan;
    }

    public BigDecimal getDettesFournisseurs() {
        return dettesFournisseurs;
    }

    public void setDettesFournisseurs(BigDecimal dettesFournisseurs) {
        this.dettesFournisseurs = dettesFournisseurs;
    }

    public BigDecimal getDettesFiscales() {
        return dettesFiscales;
    }

    public void setDettesFiscales(BigDecimal dettesFiscales) {
        this.dettesFiscales = dettesFiscales;
    }

    public BigDecimal getAutresPassifsCourants() {
        return autresPassifsCourants;
    }

    public void setAutresPassifsCourants(BigDecimal autresPassifsCourants) {
        this.autresPassifsCourants = autresPassifsCourants;
    }


    // Getters and setters
}
