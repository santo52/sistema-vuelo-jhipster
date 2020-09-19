package com.sistema.vuelo.repository;

import com.sistema.vuelo.domain.Escala;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Escala entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EscalaRepository extends JpaRepository<Escala, Long> {
}
