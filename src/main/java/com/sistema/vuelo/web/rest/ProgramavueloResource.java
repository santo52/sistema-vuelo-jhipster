package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.domain.Programavuelo;
import com.sistema.vuelo.repository.ProgramavueloRepository;
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
 * REST controller for managing {@link com.sistema.vuelo.domain.Programavuelo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProgramavueloResource {

    private final Logger log = LoggerFactory.getLogger(ProgramavueloResource.class);

    private static final String ENTITY_NAME = "programavuelo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgramavueloRepository programavueloRepository;

    public ProgramavueloResource(ProgramavueloRepository programavueloRepository) {
        this.programavueloRepository = programavueloRepository;
    }

    /**
     * {@code POST  /programavuelos} : Create a new programavuelo.
     *
     * @param programavuelo the programavuelo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new programavuelo, or with status {@code 400 (Bad Request)} if the programavuelo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/programavuelos")
    public ResponseEntity<Programavuelo> createProgramavuelo(@Valid @RequestBody Programavuelo programavuelo) throws URISyntaxException {
        log.debug("REST request to save Programavuelo : {}", programavuelo);
        if (programavuelo.getId() != null) {
            throw new BadRequestAlertException("A new programavuelo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Programavuelo result = programavueloRepository.save(programavuelo);
        return ResponseEntity.created(new URI("/api/programavuelos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /programavuelos} : Updates an existing programavuelo.
     *
     * @param programavuelo the programavuelo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programavuelo,
     * or with status {@code 400 (Bad Request)} if the programavuelo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the programavuelo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/programavuelos")
    public ResponseEntity<Programavuelo> updateProgramavuelo(@Valid @RequestBody Programavuelo programavuelo) throws URISyntaxException {
        log.debug("REST request to update Programavuelo : {}", programavuelo);
        if (programavuelo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Programavuelo result = programavueloRepository.save(programavuelo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, programavuelo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /programavuelos} : get all the programavuelos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programavuelos in body.
     */
    @GetMapping("/programavuelos")
    public List<Programavuelo> getAllProgramavuelos() {
        log.debug("REST request to get all Programavuelos");
        return programavueloRepository.findAll();
    }

    /**
     * {@code GET  /programavuelos/:id} : get the "id" programavuelo.
     *
     * @param id the id of the programavuelo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the programavuelo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/programavuelos/{id}")
    public ResponseEntity<Programavuelo> getProgramavuelo(@PathVariable Long id) {
        log.debug("REST request to get Programavuelo : {}", id);
        Optional<Programavuelo> programavuelo = programavueloRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(programavuelo);
    }

    /**
     * {@code DELETE  /programavuelos/:id} : delete the "id" programavuelo.
     *
     * @param id the id of the programavuelo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/programavuelos/{id}")
    public ResponseEntity<Void> deleteProgramavuelo(@PathVariable Long id) {
        log.debug("REST request to delete Programavuelo : {}", id);
        programavueloRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
