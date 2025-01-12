package itu.vitafoam.compte_resultat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "financial_data")
public class FinancialData {

    @Id
    @Column(name = "year")
    private Integer year;

    @Column(name = "ca", precision = 18, scale = 2)
    private BigDecimal ca;

    @Column(name = "ps", precision = 18, scale = 2)
    private BigDecimal ps;

    @Column(name = "pi", precision = 18, scale = 2)
    private BigDecimal pi;

    @Column(name = "ac", precision = 18, scale = 2)
    private BigDecimal ac;

    @Column(name = "se", precision = 18, scale = 2)
    private BigDecimal se;

    @Column(name = "cp", precision = 18, scale = 2)
    private BigDecimal cp;

    @Column(name = "it", precision = 18, scale = 2)
    private BigDecimal it;

    @Column(name = "ao", precision = 18, scale = 2)
    private BigDecimal ao;

    @Column(name = "co", precision = 18, scale = 2)
    private BigDecimal co;

    @Column(name = "dp", precision = 18, scale = 2)
    private BigDecimal dp;

    @Column(name = "rp", precision = 18, scale = 2)
    private BigDecimal rp;

    @Column(name = "pf", precision = 18, scale = 2)
    private BigDecimal pf;

    @Column(name = "cf", precision = 18, scale = 2)
    private BigDecimal cf;

    @Column(name = "ie", precision = 18, scale = 2)
    private BigDecimal ie;

    @Column(name = "id", precision = 18, scale = 2)
    private BigDecimal id;

    @Column(name = "ep", precision = 18, scale = 2)
    private BigDecimal ep;

    @Column(name = "ec", precision = 18, scale = 2)
    private BigDecimal ec;

    // Default constructor
    public FinancialData() {
    }

    // Parameterized constructor
    public FinancialData(Integer year, BigDecimal ca, BigDecimal ps, BigDecimal pi, BigDecimal ac, BigDecimal se, BigDecimal cp, BigDecimal it, BigDecimal ao, BigDecimal co, BigDecimal dp, BigDecimal rp, BigDecimal pf, BigDecimal cf, BigDecimal ie, BigDecimal id, BigDecimal ep, BigDecimal ec) {
        this.year = year;
        this.ca = ca;
        this.ps = ps;
        this.pi = pi;
        this.ac = ac;
        this.se = se;
        this.cp = cp;
        this.it = it;
        this.ao = ao;
        this.co = co;
        this.dp = dp;
        this.rp = rp;
        this.pf = pf;
        this.cf = cf;
        this.ie = ie;
        this.id = id;
        this.ep = ep;
        this.ec = ec;
    }

    // Getters and Setters
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

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

    @Override
    public String toString() {
        return "FinancialData{" +
                "year=" + year +
                ", ca=" + ca +
                ", ps=" + ps +
                ", pi=" + pi +
                ", ac=" + ac +
                ", se=" + se +
                ", cp=" + cp +
                ", it=" + it +
                ", ao=" + ao +
                ", co=" + co +
                ", dp=" + dp +
                ", rp=" + rp +
                ", pf=" + pf +
                ", cf=" + cf +
                ", ie=" + ie +
                ", id=" + id +
                ", ep=" + ep +
                ", ec=" + ec +
                '}';
    }
}
