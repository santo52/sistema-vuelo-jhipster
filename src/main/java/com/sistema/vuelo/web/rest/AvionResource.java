package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.domain.Avion;
import com.sistema.vuelo.repository.AvionRepository;
import com.sistema.vuelo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sistema.vuelo.domain.Avion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AvionResource {

    private final Logger log = LoggerFactory.getLogger(AvionResource.class);

    private static final String ENTITY_NAME = "avion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvionRepository avionRepository;

    public AvionResource(AvionRepository avionRepository) {
        this.avionRepository = avionRepository;
    }

    /**
     * {@code POST  /avions} : Create a new avion.
     *
     * @param avion the avion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new avion, or with status {@code 400 (Bad Request)} if the avion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/avions")
    public ResponseEntity<Avion> createAvion(@Valid @RequestBody Avion avion) throws URISyntaxException {
        log.debug("REST request to save Avion : {}", avion);
        if (avion.getId() != null) {
            throw new BadRequestAlertException("A new avion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Avion result = avionRepository.save(avion);
        return ResponseEntity.created(new URI("/api/avions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /avions} : Updates an existing avion.
     *
     * @param avion the avion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated avion,
     * or with status {@code 400 (Bad Request)} if the avion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the avion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/avions")
    public ResponseEntity<Avion> updateAvion(@Valid @RequestBody Avion avion) throws URISyntaxException {
        log.debug("REST request to update Avion : {}", avion);
        if (avion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Avion result = avionRepository.save(avion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, avion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /avions} : get all the avions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of avions in body.
     */
    @GetMapping("/avions")
    public List<Avion> getAllAvions() {
        log.debug("REST request to get all Avions");
        return avionRepository.findAll();
    }

    /**
     * {@code GET  /avions/:id} : get the "id" avion.
     *
     * @param id the id of the avion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the avion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/avions/{id}")
    public ResponseEntity<Avion> getAvion(@PathVariable Long id) {
        log.debug("REST request to get Avion : {}", id);
        Optional<Avion> avion = avionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(avion);
    }

    /**
     * {@code DELETE  /avions/:id} : delete the "id" avion.
     *
     * @param id the id of the avion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/avions/{id}")
    public ResponseEntity<Void> deleteAvion(@PathVariable Long id) {
        log.debug("REST request to delete Avion : {}", id);
        avionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
