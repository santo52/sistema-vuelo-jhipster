package com.sistema.vuelo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Avion.
 */
@Entity
@Table(name = "avion")
public class Avion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "id_avion", nullable = false)
    private Integer id_avion;

    @NotNull
    @Column(name = "marca", nullable = false)
    private String marca;

    @NotNull
    @Column(name = "capacidad", nullable = false)
    private String capacidad;

    @NotNull
    @Column(name = "modelo", nullable = false)
    private String modelo;

    @ManyToMany(mappedBy = "avions")
    @JsonIgnore
    private Set<Aeropuerto> aeropuertos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getId_avion() {
        return id_avion;
    }

    public Avion id_avion(Integer id_avion) {
        this.id_avion = id_avion;
        return this;
    }

    public void setId_avion(Integer id_avion) {
        this.id_avion = id_avion;
    }

    public String getMarca() {
        return marca;
    }

    public Avion marca(String marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCapacidad() {
        return capacidad;
    }

    public Avion capacidad(String capacidad) {
        this.capacidad = capacidad;
        return this;
    }

    public void setCapacidad(String capacidad) {
        this.capacidad = capacidad;
    }

    public String getModelo() {
        return modelo;
    }

    public Avion modelo(String modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Set<Aeropuerto> getAeropuertos() {
        return aeropuertos;
    }

    public Avion aeropuertos(Set<Aeropuerto> aeropuertos) {
        this.aeropuertos = aeropuertos;
        return this;
    }

    public Avion addAeropuerto(Aeropuerto aeropuerto) {
        this.aeropuertos.add(aeropuerto);
        aeropuerto.getAvions().add(this);
        return this;
    }

    public Avion removeAeropuerto(Aeropuerto aeropuerto) {
        this.aeropuertos.remove(aeropuerto);
        aeropuerto.getAvions().remove(this);
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
        if (!(o instanceof Avion)) {
            return false;
        }
        return id != null && id.equals(((Avion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Avion{" +
            "id=" + getId() +
            ", id_avion=" + getId_avion() +
            ", marca='" + getMarca() + "'" +
            ", capacidad='" + getCapacidad() + "'" +
            ", modelo='" + getModelo() + "'" +
            "}";
    }
}
