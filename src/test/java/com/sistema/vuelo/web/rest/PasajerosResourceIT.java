package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.SistemavuelosApp;
import com.sistema.vuelo.domain.Pasajeros;
import com.sistema.vuelo.repository.PasajerosRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PasajerosResource} REST controller.
 */
@SpringBootTest(classes = SistemavuelosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PasajerosResourceIT {

    @Autowired
    private PasajerosRepository pasajerosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPasajerosMockMvc;

    private Pasajeros pasajeros;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pasajeros createEntity(EntityManager em) {
        Pasajeros pasajeros = new Pasajeros();
        return pasajeros;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pasajeros createUpdatedEntity(EntityManager em) {
        Pasajeros pasajeros = new Pasajeros();
        return pasajeros;
    }

    @BeforeEach
    public void initTest() {
        pasajeros = createEntity(em);
    }

    @Test
    @Transactional
    public void createPasajeros() throws Exception {
        int databaseSizeBeforeCreate = pasajerosRepository.findAll().size();
        // Create the Pasajeros
        restPasajerosMockMvc.perform(post("/api/pasajeros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pasajeros)))
            .andExpect(status().isCreated());

        // Validate the Pasajeros in the database
        List<Pasajeros> pasajerosList = pasajerosRepository.findAll();
        assertThat(pasajerosList).hasSize(databaseSizeBeforeCreate + 1);
        Pasajeros testPasajeros = pasajerosList.get(pasajerosList.size() - 1);
    }

    @Test
    @Transactional
    public void createPasajerosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pasajerosRepository.findAll().size();

        // Create the Pasajeros with an existing ID
        pasajeros.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPasajerosMockMvc.perform(post("/api/pasajeros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pasajeros)))
            .andExpect(status().isBadRequest());

        // Validate the Pasajeros in the database
        List<Pasajeros> pasajerosList = pasajerosRepository.findAll();
        assertThat(pasajerosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPasajeros() throws Exception {
        // Initialize the database
        pasajerosRepository.saveAndFlush(pasajeros);

        // Get all the pasajerosList
        restPasajerosMockMvc.perform(get("/api/pasajeros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pasajeros.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPasajeros() throws Exception {
        // Initialize the database
        pasajerosRepository.saveAndFlush(pasajeros);

        // Get the pasajeros
        restPasajerosMockMvc.perform(get("/api/pasajeros/{id}", pasajeros.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pasajeros.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPasajeros() throws Exception {
        // Get the pasajeros
        restPasajerosMockMvc.perform(get("/api/pasajeros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePasajeros() throws Exception {
        // Initialize the database
        pasajerosRepository.saveAndFlush(pasajeros);

        int databaseSizeBeforeUpdate = pasajerosRepository.findAll().size();

        // Update the pasajeros
        Pasajeros updatedPasajeros = pasajerosRepository.findById(pasajeros.getId()).get();
        // Disconnect from session so that the updates on updatedPasajeros are not directly saved in db
        em.detach(updatedPasajeros);

        restPasajerosMockMvc.perform(put("/api/pasajeros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPasajeros)))
            .andExpect(status().isOk());

        // Validate the Pasajeros in the database
        List<Pasajeros> pasajerosList = pasajerosRepository.findAll();
        assertThat(pasajerosList).hasSize(databaseSizeBeforeUpdate);
        Pasajeros testPasajeros = pasajerosList.get(pasajerosList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPasajeros() throws Exception {
        int databaseSizeBeforeUpdate = pasajerosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPasajerosMockMvc.perform(put("/api/pasajeros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pasajeros)))
            .andExpect(status().isBadRequest());

        // Validate the Pasajeros in the database
        List<Pasajeros> pasajerosList = pasajerosRepository.findAll();
        assertThat(pasajerosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePasajeros() throws Exception {
        // Initialize the database
        pasajerosRepository.saveAndFlush(pasajeros);

        int databaseSizeBeforeDelete = pasajerosRepository.findAll().size();

        // Delete the pasajeros
        restPasajerosMockMvc.perform(delete("/api/pasajeros/{id}", pasajeros.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pasajeros> pasajerosList = pasajerosRepository.findAll();
        assertThat(pasajerosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
