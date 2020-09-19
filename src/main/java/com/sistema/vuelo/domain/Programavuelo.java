package com.sistema.vuelo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Programavuelo.
 */
@Entity
@Table(name = "programavuelo")
public class Programavuelo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "escala", nullable = false)
    private String escala;

    @NotNull
    @Column(name = "idprograma", nullable = false, unique = true)
    private Integer idprograma;

    @NotNull
    @Column(name = "linea", nullable = false)
    private String linea;

    @NotNull
    @Column(name = "dias", nullable = false)
    private LocalDate dias;

    @ManyToOne
    @JsonIgnoreProperties(value = "programavuelos", allowSetters = true)
    private Vuelo vuelo;

    @OneToMany(mappedBy = "programavuelo")
    private Set<Aeropuerto> aeropuertos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEscala() {
        return escala;
    }

    public Programavuelo escala(String escala) {
        this.escala = escala;
        return this;
    }

    public void setEscala(String escala) {
        this.escala = escala;
    }

    public Integer getIdprograma() {
        return idprograma;
    }

    public Programavuelo idprograma(Integer idprograma) {
        this.idprograma = idprograma;
        return this;
    }

    public void setIdprograma(Integer idprograma) {
        this.idprograma = idprograma;
    }

    public String getLinea() {
        return linea;
    }

    public Programavuelo linea(String linea) {
        this.linea = linea;
        return this;
    }

    public void setLinea(String linea) {
        this.linea = linea;
    }

    public LocalDate getDias() {
        return dias;
    }

    public Programavuelo dias(LocalDate dias) {
        this.dias = dias;
        return this;
    }

    public void setDias(LocalDate dias) {
        this.dias = dias;
    }

    public Vuelo getVuelo() {
        return vuelo;
    }

    public Programavuelo vuelo(Vuelo vuelo) {
        this.vuelo = vuelo;
        return this;
    }

    public void setVuelo(Vuelo vuelo) {
        this.vuelo = vuelo;
    }

    public Set<Aeropuerto> getAeropuertos() {
        return aeropuertos;
    }

    public Programavuelo aeropuertos(Set<Aeropuerto> aeropuertos) {
        this.aeropuertos = aeropuertos;
        return this;
    }

    public Programavuelo addAeropuerto(Aeropuerto aeropuerto) {
        this.aeropuertos.add(aeropuerto);
        aeropuerto.setProgramavuelo(this);
        return this;
    }

    public Programavuelo removeAeropuerto(Aeropuerto aeropuerto) {
        this.aeropuertos.remove(aeropuerto);
        aeropuerto.setProgramavuelo(null);
        return this;
    }

    public void setAeropuertos(Set<Aeropuerto> aeropuertos) {
        this.aeropuertos = aeropuertos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Programavuelo)) {
            return false;
        }
        return id != null && id.equals(((Programavuelo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Programavuelo{" +
            "id=" + getId() +
            ", escala='" + getEscala() + "'" +
            ", idprograma=" + getIdprograma() +
            ", linea='" + getLinea() + "'" +
            ", dias='" + getDias() + "'" +
            "}";
    }
}
