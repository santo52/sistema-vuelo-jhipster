package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.SistemavuelosApp;
import com.sistema.vuelo.domain.Vuelo;
import com.sistema.vuelo.repository.VueloRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VueloResource} REST controller.
 */
@SpringBootTest(classes = SistemavuelosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VueloResourceIT {

    private static final String DEFAULT_IDVUELO = "AAAAAAAAAA";
    private static final String UPDATED_IDVUELO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private VueloRepository vueloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVueloMockMvc;

    private Vuelo vuelo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vuelo createEntity(EntityManager em) {
        Vuelo vuelo = new Vuelo()
            .idvuelo(DEFAULT_IDVUELO)
            .fecha(DEFAULT_FECHA);
        return vuelo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vuelo createUpdatedEntity(EntityManager em) {
        Vuelo vuelo = new Vuelo()
            .idvuelo(UPDATED_IDVUELO)
            .fecha(UPDATED_FECHA);
        return vuelo;
    }

    @BeforeEach
    public void initTest() {
        vuelo = createEntity(em);
    }

    @Test
    @Transactional
    public void createVuelo() throws Exception {
        int databaseSizeBeforeCreate = vueloRepository.findAll().size();
        // Create the Vuelo
        restVueloMockMvc.perform(post("/api/vuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vuelo)))
            .andExpect(status().isCreated());

        // Validate the Vuelo in the database
        List<Vuelo> vueloList = vueloRepository.findAll();
        assertThat(vueloList).hasSize(databaseSizeBeforeCreate + 1);
        Vuelo testVuelo = vueloList.get(vueloList.size() - 1);
        assertThat(testVuelo.getIdvuelo()).isEqualTo(DEFAULT_IDVUELO);
        assertThat(testVuelo.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createVueloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vueloRepository.findAll().size();

        // Create the Vuelo with an existing ID
        vuelo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVueloMockMvc.perform(post("/api/vuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vuelo)))
            .andExpect(status().isBadRequest());

        // Validate the Vuelo in the database
        List<Vuelo> vueloList = vueloRepository.findAll();
        assertThat(vueloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIdvueloIsRequired() throws Exception {
        int databaseSizeBeforeTest = vueloRepository.findAll().size();
        // set the field null
        vuelo.setIdvuelo(null);

        // Create the Vuelo, which fails.


        restVueloMockMvc.perform(post("/api/vuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vuelo)))
            .andExpect(status().isBadRequest());

        List<Vuelo> vueloList = vueloRepository.findAll();
        assertThat(vueloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = vueloRepository.findAll().size();
        // set the field null
        vuelo.setFecha(null);

        // Create the Vuelo, which fails.


        restVueloMockMvc.perform(post("/api/vuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vuelo)))
            .andExpect(status().isBadRequest());

        List<Vuelo> vueloList = vueloRepository.findAll();
        assertThat(vueloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVuelos() throws Exception {
        // Initialize the database
        vueloRepository.saveAndFlush(vuelo);

        // Get all the vueloList
        restVueloMockMvc.perform(get("/api/vuelos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vuelo.getId().intValue())))
            .andExpect(jsonPath("$.[*].idvuelo").value(hasItem(DEFAULT_IDVUELO)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }
    
    @Test
    @Transactional
    public void getVuelo() throws Exception {
        // Initialize the database
        vueloRepository.saveAndFlush(vuelo);

        // Get the vuelo
        restVueloMockMvc.perform(get("/api/vuelos/{id}", vuelo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vuelo.getId().intValue()))
            .andExpect(jsonPath("$.idvuelo").value(DEFAULT_IDVUELO))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingVuelo() throws Exception {
        // Get the vuelo
        restVueloMockMvc.perform(get("/api/vuelos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVuelo() throws Exception {
        // Initialize the database
        vueloRepository.saveAndFlush(vuelo);

        int databaseSizeBeforeUpdate = vueloRepository.findAll().size();

        // Update the vuelo
        Vuelo updatedVuelo = vueloRepository.findById(vuelo.getId()).get();
        // Disconnect from session so that the updates on updatedVuelo are not directly saved in db
        em.detach(updatedVuelo);
        updatedVuelo
            .idvuelo(UPDATED_IDVUELO)
            .fecha(UPDATED_FECHA);

        restVueloMockMvc.perform(put("/api/vuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVuelo)))
            .andExpect(status().isOk());

        // Validate the Vuelo in the database
        List<Vuelo> vueloList = vueloRepository.findAll();
        assertThat(vueloList).hasSize(databaseSizeBeforeUpdate);
        Vuelo testVuelo = vueloList.get(vueloList.size() - 1);
        assertThat(testVuelo.getIdvuelo()).isEqualTo(UPDATED_IDVUELO);
        assertThat(testVuelo.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingVuelo() throws Exception {
        int databaseSizeBeforeUpdate = vueloRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVueloMockMvc.perform(put("/api/vuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vuelo)))
            .andExpect(status().isBadRequest());

        // Validate the Vuelo in the database
        List<Vuelo> vueloList = vueloRepository.findAll();
        assertThat(vueloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVuelo() throws Exception {
        // Initialize the database
        vueloRepository.saveAndFlush(vuelo);

        int databaseSizeBeforeDelete = vueloRepository.findAll().size();

        // Delete the vuelo
        restVueloMockMvc.perform(delete("/api/vuelos/{id}", vuelo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Vuelo> vueloList = vueloRepository.findAll();
        assertThat(vueloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
