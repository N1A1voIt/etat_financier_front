package itu.vitafoam.compte_resultat;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.math.BigDecimal;
@Entity
@Table(name = "financial_data")
public class CompteResultatDTO {
    BigDecimal ca;
    BigDecimal ps;
    BigDecimal pi;
    BigDecimal ac;
    BigDecimal se;
    BigDecimal cp;
    BigDecimal it;
    BigDecimal ao;
    BigDecimal co;
    BigDecimal dp;
    BigDecimal rp;
    BigDecimal pf;
    BigDecimal cf;
    BigDecimal ie;
    BigDecimal id;
    BigDecimal ep;
    BigDecimal ec;

    public BigDecimal getCa() {
        return ca;
    }

    public void setCa(BigDecimal ca) {
        this.ca = ca;
    }

    public BigDecimal getPs() {
        return ps;
    }

    public void setPs(BigDecimal ps) {
        this.ps = ps;
    }

    public BigDecimal getPi() {
        return pi;
    }

    public void setPi(BigDecimal pi) {
        this.pi = pi;
    }

    public BigDecimal getAc() {
        return ac;
    }

    public void setAc(BigDecimal ac) {
        this.ac = ac;
    }

    public BigDecimal getSe() {
        return se;
    }

    public void setSe(BigDecimal se) {
        this.se = se;
    }

    public BigDecimal getCp() {
        return cp;
    }

    public void setCp(BigDecimal cp) {
        this.cp = cp;
    }

    public BigDecimal getIt() {
        return it;
    }

    public void setIt(BigDecimal it) {
        this.it = it;
    }

    public BigDecimal getAo() {
        return ao;
    }

    public void setAo(BigDecimal ao) {
        this.ao = ao;
    }

    public BigDecimal getCo() {
        return co;
    }

    public void setCo(BigDecimal co) {
        this.co = co;
    }

    public BigDecimal getDp() {
        return dp;
    }

    public void setDp(BigDecimal dp) {
        this.dp = dp;
    }

    public BigDecimal getRp() {
        return rp;
    }

    public void setRp(BigDecimal rp) {
        this.rp = rp;
    }

    public BigDecimal getPf() {
        return pf;
    }

    public void setPf(BigDecimal pf) {
        this.pf = pf;
    }

    public BigDecimal getCf() {
        return cf;
    }

    public void setCf(BigDecimal cf) {
        this.cf = cf;
    }

    public BigDecimal getIe() {
        return ie;
    }

    public void setIe(BigDecimal ie) {
        this.ie = ie;
    }

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public BigDecimal getEp() {
        return ep;
    }

    public void setEp(BigDecimal ep) {
        this.ep = ep;
    }

    public BigDecimal getEc() {
        return ec;
    }

    public void setEc(BigDecimal ec) {
        this.ec = ec;
    }
}
