package com.sistema.vuelo.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Escala.
 */
@Entity
@Table(name = "escala")
public class Escala implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "id_escala", nullable = false)
    private Integer id_escala;

    @NotNull
    @Column(name = "origen", nullable = false)
    private String origen;

    @NotNull
    @Column(name = "destino", nullable = false)
    private String destino;

    @NotNull
    @Column(name = "suben_pasajeros", nullable = false)
    private String suben_pasajeros;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getId_escala() {
        return id_escala;
    }

    public Escala id_escala(Integer id_escala) {
        this.id_escala = id_escala;
        return this;
    }

    public void setId_escala(Integer id_escala) {
        this.id_escala = id_escala;
    }

    public String getOrigen() {
        return origen;
    }

    public Escala origen(String origen) {
        this.origen = origen;
        return this;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public Escala destino(String destino) {
        this.destino = destino;
        return this;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getSuben_pasajeros() {
        return suben_pasajeros;
    }

    public Escala suben_pasajeros(String suben_pasajeros) {
        this.suben_pasajeros = suben_pasajeros;
        return this;
    }

    public void setSuben_pasajeros(String suben_pasajeros) {
        this.suben_pasajeros = suben_pasajeros;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Escala)) {
            return false;
        }
        return id != null && id.equals(((Escala) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Escala{" +
            "id=" + getId() +
            ", id_escala=" + getId_escala() +
            ", origen='" + getOrigen() + "'" +
            ", destino='" + getDestino() + "'" +
            ", suben_pasajeros='" + getSuben_pasajeros() + "'" +
            "}";
    }
}
