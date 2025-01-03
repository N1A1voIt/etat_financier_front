package itu.vitafoam.actif;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "actif_courant")
public class ActifCourant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_actif_courant")
    private Long idActifCourant;

    @Column(name = "id_bilan")
    private Long idBilan;

    @Column(name = "stocks")
    private BigDecimal stocks;

    @Column(name = "creances_clients")
    private BigDecimal creancesClients;

    @Column(name = "disponibilites")
    private BigDecimal disponibilites;

    @Column(name = "autres_actifs_courants")
    private BigDecimal autresActifsCourants;

    public BigDecimal sommerActifsCourants(){
        return BigDecimal.valueOf(
                this.getStocks().doubleValue()
                + this.getCreancesClients().doubleValue()
                + this.getDisponibilites().doubleValue()
                + this.getAutresActifsCourants().doubleValue()
        );
    }

    public Long getIdActifCourant() {
        return idActifCourant;
    }

    public void setIdActifCourant(Long idActifCourant) {
        this.idActifCourant = idActifCourant;
    }

    public Long getIdBilan() {
        return idBilan;
    }

    public void setIdBilan(Long idBilan) {
        this.idBilan = idBilan;
    }

    public BigDecimal getStocks() {
        return stocks;
    }

    public void setStocks(BigDecimal stocks) {
        this.stocks = stocks;
    }

    public BigDecimal getCreancesClients() {
        return creancesClients;
    }

    public void setCreancesClients(BigDecimal creancesClients) {
        this.creancesClients = creancesClients;
    }

    public BigDecimal getDisponibilites() {
        return disponibilites;
    }

    public void setDisponibilites(BigDecimal disponibilites) {
        this.disponibilites = disponibilites;
    }

    public BigDecimal getAutresActifsCourants() {
        return autresActifsCourants;
    }

    public void setAutresActifsCourants(BigDecimal autresActifsCourants) {
        this.autresActifsCourants = autresActifsCourants;
    }

    // Getters and setters
}
