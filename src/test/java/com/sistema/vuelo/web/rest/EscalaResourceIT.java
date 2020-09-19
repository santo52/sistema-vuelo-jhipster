package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.SistemavuelosApp;
import com.sistema.vuelo.domain.Escala;
import com.sistema.vuelo.repository.EscalaRepository;

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
 * Integration tests for the {@link EscalaResource} REST controller.
 */
@SpringBootTest(classes = SistemavuelosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EscalaResourceIT {

    private static final Integer DEFAULT_ID_ESCALA = 1;
    private static final Integer UPDATED_ID_ESCALA = 2;

    private static final String DEFAULT_ORIGEN = "AAAAAAAAAA";
    private static final String UPDATED_ORIGEN = "BBBBBBBBBB";

    private static final String DEFAULT_DESTINO = "AAAAAAAAAA";
    private static final String UPDATED_DESTINO = "BBBBBBBBBB";

    private static final String DEFAULT_SUBEN_PASAJEROS = "AAAAAAAAAA";
    private static final String UPDATED_SUBEN_PASAJEROS = "BBBBBBBBBB";

    @Autowired
    private EscalaRepository escalaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEscalaMockMvc;

    private Escala escala;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Escala createEntity(EntityManager em) {
        Escala escala = new Escala()
            .id_escala(DEFAULT_ID_ESCALA)
            .origen(DEFAULT_ORIGEN)
            .destino(DEFAULT_DESTINO)
            .suben_pasajeros(DEFAULT_SUBEN_PASAJEROS);
        return escala;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Escala createUpdatedEntity(EntityManager em) {
        Escala escala = new Escala()
            .id_escala(UPDATED_ID_ESCALA)
            .origen(UPDATED_ORIGEN)
            .destino(UPDATED_DESTINO)
            .suben_pasajeros(UPDATED_SUBEN_PASAJEROS);
        return escala;
    }

    @BeforeEach
    public void initTest() {
        escala = createEntity(em);
    }

    @Test
    @Transactional
    public void createEscala() throws Exception {
        int databaseSizeBeforeCreate = escalaRepository.findAll().size();
        // Create the Escala
        restEscalaMockMvc.perform(post("/api/escalas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escala)))
            .andExpect(status().isCreated());

        // Validate the Escala in the database
        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeCreate + 1);
        Escala testEscala = escalaList.get(escalaList.size() - 1);
        assertThat(testEscala.getId_escala()).isEqualTo(DEFAULT_ID_ESCALA);
        assertThat(testEscala.getOrigen()).isEqualTo(DEFAULT_ORIGEN);
        assertThat(testEscala.getDestino()).isEqualTo(DEFAULT_DESTINO);
        assertThat(testEscala.getSuben_pasajeros()).isEqualTo(DEFAULT_SUBEN_PASAJEROS);
    }

    @Test
    @Transactional
    public void createEscalaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = escalaRepository.findAll().size();

        // Create the Escala with an existing ID
        escala.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEscalaMockMvc.perform(post("/api/escalas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escala)))
            .andExpect(status().isBadRequest());

        // Validate the Escala in the database
        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkId_escalaIsRequired() throws Exception {
        int databaseSizeBeforeTest = escalaRepository.findAll().size();
        // set the field null
        escala.setId_escala(null);

        // Create the Escala, which fails.


        restEscalaMockMvc.perform(post("/api/escalas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escala)))
            .andExpect(status().isBadRequest());

        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOrigenIsRequired() throws Exception {
        int databaseSizeBeforeTest = escalaRepository.findAll().size();
        // set the field null
        escala.setOrigen(null);

        // Create the Escala, which fails.


        restEscalaMockMvc.perform(post("/api/escalas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escala)))
            .andExpect(status().isBadRequest());

        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDestinoIsRequired() throws Exception {
        int databaseSizeBeforeTest = escalaRepository.findAll().size();
        // set the field null
        escala.setDestino(null);

        // Create the Escala, which fails.


        restEscalaMockMvc.perform(post("/api/escalas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escala)))
            .andExpect(status().isBadRequest());

        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSuben_pasajerosIsRequired() throws Exception {
        int databaseSizeBeforeTest = escalaRepository.findAll().size();
        // set the field null
        escala.setSuben_pasajeros(null);

        // Create the Escala, which fails.


        restEscalaMockMvc.perform(post("/api/escalas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escala)))
            .andExpect(status().isBadRequest());

        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEscalas() throws Exception {
        // Initialize the database
        escalaRepository.saveAndFlush(escala);

        // Get all the escalaList
        restEscalaMockMvc.perform(get("/api/escalas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(escala.getId().intValue())))
            .andExpect(jsonPath("$.[*].id_escala").value(hasItem(DEFAULT_ID_ESCALA)))
            .andExpect(jsonPath("$.[*].origen").value(hasItem(DEFAULT_ORIGEN)))
            .andExpect(jsonPath("$.[*].destino").value(hasItem(DEFAULT_DESTINO)))
            .andExpect(jsonPath("$.[*].suben_pasajeros").value(hasItem(DEFAULT_SUBEN_PASAJEROS)));
    }
    
    @Test
    @Transactional
    public void getEscala() throws Exception {
        // Initialize the database
        escalaRepository.saveAndFlush(escala);

        // Get the escala
        restEscalaMockMvc.perform(get("/api/escalas/{id}", escala.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(escala.getId().intValue()))
            .andExpect(jsonPath("$.id_escala").value(DEFAULT_ID_ESCALA))
            .andExpect(jsonPath("$.origen").value(DEFAULT_ORIGEN))
            .andExpect(jsonPath("$.destino").value(DEFAULT_DESTINO))
            .andExpect(jsonPath("$.suben_pasajeros").value(DEFAULT_SUBEN_PASAJEROS));
    }
    @Test
    @Transactional
    public void getNonExistingEscala() throws Exception {
        // Get the escala
        restEscalaMockMvc.perform(get("/api/escalas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEscala() throws Exception {
        // Initialize the database
        escalaRepository.saveAndFlush(escala);

        int databaseSizeBeforeUpdate = escalaRepository.findAll().size();

        // Update the escala
        Escala updatedEscala = escalaRepository.findById(escala.getId()).get();
        // Disconnect from session so that the updates on updatedEscala are not directly saved in db
        em.detach(updatedEscala);
        updatedEscala
            .id_escala(UPDATED_ID_ESCALA)
            .origen(UPDATED_ORIGEN)
            .destino(UPDATED_DESTINO)
            .suben_pasajeros(UPDATED_SUBEN_PASAJEROS);

        restEscalaMockMvc.perform(put("/api/escalas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEscala)))
            .andExpect(status().isOk());

        // Validate the Escala in the database
        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeUpdate);
        Escala testEscala = escalaList.get(escalaList.size() - 1);
        assertThat(testEscala.getId_escala()).isEqualTo(UPDATED_ID_ESCALA);
        assertThat(testEscala.getOrigen()).isEqualTo(UPDATED_ORIGEN);
        assertThat(testEscala.getDestino()).isEqualTo(UPDATED_DESTINO);
        assertThat(testEscala.getSuben_pasajeros()).isEqualTo(UPDATED_SUBEN_PASAJEROS);
    }

    @Test
    @Transactional
    public void updateNonExistingEscala() throws Exception {
        int databaseSizeBeforeUpdate = escalaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEscalaMockMvc.perform(put("/api/escalas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(escala)))
            .andExpect(status().isBadRequest());

        // Validate the Escala in the database
        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEscala() throws Exception {
        // Initialize the database
        escalaRepository.saveAndFlush(escala);

        int databaseSizeBeforeDelete = escalaRepository.findAll().size();

        // Delete the escala
        restEscalaMockMvc.perform(delete("/api/escalas/{id}", escala.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Escala> escalaList = escalaRepository.findAll();
        assertThat(escalaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
