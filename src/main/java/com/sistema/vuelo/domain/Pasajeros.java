package com.sistema.vuelo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Pasajeros.
 */
@Entity
@Table(name = "pasajeros")
public class Pasajeros implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "pasajeros", allowSetters = true)
    private Vuelo vuelo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vuelo getVuelo() {
        return vuelo;
    }

    public Pasajeros vuelo(Vuelo vuelo) {
        this.vuelo = vuelo;
        return this;
    }

    public void setVuelo(Vuelo vuelo) {
        this.vuelo = vuelo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pasajeros)) {
            return false;
        }
        return id != null && id.equals(((Pasajeros) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pasajeros{" +
            "id=" + getId() +
            "}";
    }
}
