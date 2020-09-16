package com.sistema.vuelo.repository;

import com.sistema.vuelo.domain.Aeropuerto;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Aeropuerto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AeropuertoRepository extends JpaRepository<Aeropuerto, Long> {
}
