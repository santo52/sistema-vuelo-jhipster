package com.sistema.vuelo.repository;

import com.sistema.vuelo.domain.Programavuelo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Programavuelo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramavueloRepository extends JpaRepository<Programavuelo, Long> {
}
