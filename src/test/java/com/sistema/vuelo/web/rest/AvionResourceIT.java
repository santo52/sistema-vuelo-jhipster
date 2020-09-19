package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.SistemavuelosApp;
import com.sistema.vuelo.domain.Avion;
import com.sistema.vuelo.repository.AvionRepository;

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
 * Integration tests for the {@link AvionResource} REST controller.
 */
@SpringBootTest(classes = SistemavuelosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AvionResourceIT {

    private static final Integer DEFAULT_ID_AVION = 1;
    private static final Integer UPDATED_ID_AVION = 2;

    private static final String DEFAULT_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_MARCA = "BBBBBBBBBB";

    private static final String DEFAULT_CAPACIDAD = "AAAAAAAAAA";
    private static final String UPDATED_CAPACIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_MODELO = "BBBBBBBBBB";

    @Autowired
    private AvionRepository avionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAvionMockMvc;

    private Avion avion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Avion createEntity(EntityManager em) {
        Avion avion = new Avion()
            .id_avion(DEFAULT_ID_AVION)
            .marca(DEFAULT_MARCA)
            .capacidad(DEFAULT_CAPACIDAD)
            .modelo(DEFAULT_MODELO);
        return avion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Avion createUpdatedEntity(EntityManager em) {
        Avion avion = new Avion()
            .id_avion(UPDATED_ID_AVION)
            .marca(UPDATED_MARCA)
            .capacidad(UPDATED_CAPACIDAD)
            .modelo(UPDATED_MODELO);
        return avion;
    }

    @BeforeEach
    public void initTest() {
        avion = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvion() throws Exception {
        int databaseSizeBeforeCreate = avionRepository.findAll().size();
        // Create the Avion
        restAvionMockMvc.perform(post("/api/avions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avion)))
            .andExpect(status().isCreated());

        // Validate the Avion in the database
        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeCreate + 1);
        Avion testAvion = avionList.get(avionList.size() - 1);
        assertThat(testAvion.getId_avion()).isEqualTo(DEFAULT_ID_AVION);
        assertThat(testAvion.getMarca()).isEqualTo(DEFAULT_MARCA);
        assertThat(testAvion.getCapacidad()).isEqualTo(DEFAULT_CAPACIDAD);
        assertThat(testAvion.getModelo()).isEqualTo(DEFAULT_MODELO);
    }

    @Test
    @Transactional
    public void createAvionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = avionRepository.findAll().size();

        // Create the Avion with an existing ID
        avion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvionMockMvc.perform(post("/api/avions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avion)))
            .andExpect(status().isBadRequest());

        // Validate the Avion in the database
        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkId_avionIsRequired() throws Exception {
        int databaseSizeBeforeTest = avionRepository.findAll().size();
        // set the field null
        avion.setId_avion(null);

        // Create the Avion, which fails.


        restAvionMockMvc.perform(post("/api/avions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avion)))
            .andExpect(status().isBadRequest());

        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMarcaIsRequired() throws Exception {
        int databaseSizeBeforeTest = avionRepository.findAll().size();
        // set the field null
        avion.setMarca(null);

        // Create the Avion, which fails.


        restAvionMockMvc.perform(post("/api/avions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avion)))
            .andExpect(status().isBadRequest());

        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCapacidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = avionRepository.findAll().size();
        // set the field null
        avion.setCapacidad(null);

        // Create the Avion, which fails.


        restAvionMockMvc.perform(post("/api/avions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avion)))
            .andExpect(status().isBadRequest());

        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkModeloIsRequired() throws Exception {
        int databaseSizeBeforeTest = avionRepository.findAll().size();
        // set the field null
        avion.setModelo(null);

        // Create the Avion, which fails.


        restAvionMockMvc.perform(post("/api/avions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avion)))
            .andExpect(status().isBadRequest());

        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAvions() throws Exception {
        // Initialize the database
        avionRepository.saveAndFlush(avion);

        // Get all the avionList
        restAvionMockMvc.perform(get("/api/avions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avion.getId().intValue())))
            .andExpect(jsonPath("$.[*].id_avion").value(hasItem(DEFAULT_ID_AVION)))
            .andExpect(jsonPath("$.[*].marca").value(hasItem(DEFAULT_MARCA)))
            .andExpect(jsonPath("$.[*].capacidad").value(hasItem(DEFAULT_CAPACIDAD)))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO)));
    }
    
    @Test
    @Transactional
    public void getAvion() throws Exception {
        // Initialize the database
        avionRepository.saveAndFlush(avion);

        // Get the avion
        restAvionMockMvc.perform(get("/api/avions/{id}", avion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(avion.getId().intValue()))
            .andExpect(jsonPath("$.id_avion").value(DEFAULT_ID_AVION))
            .andExpect(jsonPath("$.marca").value(DEFAULT_MARCA))
            .andExpect(jsonPath("$.capacidad").value(DEFAULT_CAPACIDAD))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO));
    }
    @Test
    @Transactional
    public void getNonExistingAvion() throws Exception {
        // Get the avion
        restAvionMockMvc.perform(get("/api/avions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvion() throws Exception {
        // Initialize the database
        avionRepository.saveAndFlush(avion);

        int databaseSizeBeforeUpdate = avionRepository.findAll().size();

        // Update the avion
        Avion updatedAvion = avionRepository.findById(avion.getId()).get();
        // Disconnect from session so that the updates on updatedAvion are not directly saved in db
        em.detach(updatedAvion);
        updatedAvion
            .id_avion(UPDATED_ID_AVION)
            .marca(UPDATED_MARCA)
            .capacidad(UPDATED_CAPACIDAD)
            .modelo(UPDATED_MODELO);

        restAvionMockMvc.perform(put("/api/avions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAvion)))
            .andExpect(status().isOk());

        // Validate the Avion in the database
        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeUpdate);
        Avion testAvion = avionList.get(avionList.size() - 1);
        assertThat(testAvion.getId_avion()).isEqualTo(UPDATED_ID_AVION);
        assertThat(testAvion.getMarca()).isEqualTo(UPDATED_MARCA);
        assertThat(testAvion.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
        assertThat(testAvion.getModelo()).isEqualTo(UPDATED_MODELO);
    }

    @Test
    @Transactional
    public void updateNonExistingAvion() throws Exception {
        int databaseSizeBeforeUpdate = avionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvionMockMvc.perform(put("/api/avions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avion)))
            .andExpect(status().isBadRequest());

        // Validate the Avion in the database
        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAvion() throws Exception {
        // Initialize the database
        avionRepository.saveAndFlush(avion);

        int databaseSizeBeforeDelete = avionRepository.findAll().size();

        // Delete the avion
        restAvionMockMvc.perform(delete("/api/avions/{id}", avion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Avion> avionList = avionRepository.findAll();
        assertThat(avionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
