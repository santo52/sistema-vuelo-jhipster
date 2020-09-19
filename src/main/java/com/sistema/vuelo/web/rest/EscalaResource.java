package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.domain.Escala;
import com.sistema.vuelo.repository.EscalaRepository;
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
 * REST controller for managing {@link com.sistema.vuelo.domain.Escala}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EscalaResource {

    private final Logger log = LoggerFactory.getLogger(EscalaResource.class);

    private static final String ENTITY_NAME = "escala";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EscalaRepository escalaRepository;

    public EscalaResource(EscalaRepository escalaRepository) {
        this.escalaRepository = escalaRepository;
    }

    /**
     * {@code POST  /escalas} : Create a new escala.
     *
     * @param escala the escala to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new escala, or with status {@code 400 (Bad Request)} if the escala has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/escalas")
    public ResponseEntity<Escala> createEscala(@Valid @RequestBody Escala escala) throws URISyntaxException {
        log.debug("REST request to save Escala : {}", escala);
        if (escala.getId() != null) {
            throw new BadRequestAlertException("A new escala cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Escala result = escalaRepository.save(escala);
        return ResponseEntity.created(new URI("/api/escalas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /escalas} : Updates an existing escala.
     *
     * @param escala the escala to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated escala,
     * or with status {@code 400 (Bad Request)} if the escala is not valid,
     * or with status {@code 500 (Internal Server Error)} if the escala couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/escalas")
    public ResponseEntity<Escala> updateEscala(@Valid @RequestBody Escala escala) throws URISyntaxException {
        log.debug("REST request to update Escala : {}", escala);
        if (escala.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Escala result = escalaRepository.save(escala);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, escala.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /escalas} : get all the escalas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of escalas in body.
     */
    @GetMapping("/escalas")
    public List<Escala> getAllEscalas() {
        log.debug("REST request to get all Escalas");
        return escalaRepository.findAll();
    }

    /**
     * {@code GET  /escalas/:id} : get the "id" escala.
     *
     * @param id the id of the escala to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the escala, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/escalas/{id}")
    public ResponseEntity<Escala> getEscala(@PathVariable Long id) {
        log.debug("REST request to get Escala : {}", id);
        Optional<Escala> escala = escalaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(escala);
    }

    /**
     * {@code DELETE  /escalas/:id} : delete the "id" escala.
     *
     * @param id the id of the escala to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/escalas/{id}")
    public ResponseEntity<Void> deleteEscala(@PathVariable Long id) {
        log.debug("REST request to delete Escala : {}", id);
        escalaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
