package com.sistema.vuelo.repository;

import com.sistema.vuelo.domain.Vuelo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Vuelo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VueloRepository extends JpaRepository<Vuelo, Long> {
}
