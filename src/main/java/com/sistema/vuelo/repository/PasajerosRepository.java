package com.sistema.vuelo.repository;

import com.sistema.vuelo.domain.Pasajeros;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pasajeros entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PasajerosRepository extends JpaRepository<Pasajeros, Long> {
}
