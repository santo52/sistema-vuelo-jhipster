package com.sistema.vuelo.repository;

import com.sistema.vuelo.domain.Avion;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Avion entity.
 */
@Repository
public interface AvionRepository extends JpaRepository<Avion, Long> {

    @Query(value = "select distinct avion from Avion avion left join fetch avion.aeropuertos",
        countQuery = "select count(distinct avion) from Avion avion")
    Page<Avion> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct avion from Avion avion left join fetch avion.aeropuertos")
    List<Avion> findAllWithEagerRelationships();

    @Query("select avion from Avion avion left join fetch avion.aeropuertos where avion.id =:id")
    Optional<Avion> findOneWithEagerRelationships(@Param("id") Long id);
}
