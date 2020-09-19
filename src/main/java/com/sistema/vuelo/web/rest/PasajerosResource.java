package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.domain.Pasajeros;
import com.sistema.vuelo.repository.PasajerosRepository;
import com.sistema.vuelo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sistema.vuelo.domain.Pasajeros}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PasajerosResource {

    private final Logger log = LoggerFactory.getLogger(PasajerosResource.class);

    private static final String ENTITY_NAME = "pasajeros";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PasajerosRepository pasajerosRepository;

    public PasajerosResource(PasajerosRepository pasajerosRepository) {
        this.pasajerosRepository = pasajerosRepository;
    }

    /**
     * {@code POST  /pasajeros} : Create a new pasajeros.
     *
     * @param pasajeros the pasajeros to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pasajeros, or with status {@code 400 (Bad Request)} if the pasajeros has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pasajeros")
    public ResponseEntity<Pasajeros> createPasajeros(@RequestBody Pasajeros pasajeros) throws URISyntaxException {
        log.debug("REST request to save Pasajeros : {}", pasajeros);
        if (pasajeros.getId() != null) {
            throw new BadRequestAlertException("A new pasajeros cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pasajeros result = pasajerosRepository.save(pasajeros);
        return ResponseEntity.created(new URI("/api/pasajeros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pasajeros} : Updates an existing pasajeros.
     *
     * @param pasajeros the pasajeros to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pasajeros,
     * or with status {@code 400 (Bad Request)} if the pasajeros is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pasajeros couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pasajeros")
    public ResponseEntity<Pasajeros> updatePasajeros(@RequestBody Pasajeros pasajeros) throws URISyntaxException {
        log.debug("REST request to update Pasajeros : {}", pasajeros);
        if (pasajeros.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pasajeros result = pasajerosRepository.save(pasajeros);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pasajeros.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pasajeros} : get all the pasajeros.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pasajeros in body.
     */
    @GetMapping("/pasajeros")
    public List<Pasajeros> getAllPasajeros() {
        log.debug("REST request to get all Pasajeros");
        return pasajerosRepository.findAll();
    }

    /**
     * {@code GET  /pasajeros/:id} : get the "id" pasajeros.
     *
     * @param id the id of the pasajeros to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pasajeros, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pasajeros/{id}")
    public ResponseEntity<Pasajeros> getPasajeros(@PathVariable Long id) {
        log.debug("REST request to get Pasajeros : {}", id);
        Optional<Pasajeros> pasajeros = pasajerosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pasajeros);
    }

    /**
     * {@code DELETE  /pasajeros/:id} : delete the "id" pasajeros.
     *
     * @param id the id of the pasajeros to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pasajeros/{id}")
    public ResponseEntity<Void> deletePasajeros(@PathVariable Long id) {
        log.debug("REST request to delete Pasajeros : {}", id);
        pasajerosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
