package com.sistema.vuelo.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Vuelo.
 */
@Entity
@Table(name = "vuelo")
public class Vuelo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "idvuelo", nullable = false)
    private String idvuelo;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdvuelo() {
        return idvuelo;
    }

    public Vuelo idvuelo(String idvuelo) {
        this.idvuelo = idvuelo;
        return this;
    }

    public void setIdvuelo(String idvuelo) {
        this.idvuelo = idvuelo;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Vuelo fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vuelo)) {
            return false;
        }
        return id != null && id.equals(((Vuelo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vuelo{" +
            "id=" + getId() +
            ", idvuelo='" + getIdvuelo() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
