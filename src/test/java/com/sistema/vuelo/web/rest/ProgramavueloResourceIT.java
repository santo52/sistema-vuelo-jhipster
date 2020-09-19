package com.sistema.vuelo.web.rest;

import com.sistema.vuelo.SistemavuelosApp;
import com.sistema.vuelo.domain.Programavuelo;
import com.sistema.vuelo.repository.ProgramavueloRepository;

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
 * Integration tests for the {@link ProgramavueloResource} REST controller.
 */
@SpringBootTest(classes = SistemavuelosApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProgramavueloResourceIT {

    private static final String DEFAULT_ESCALA = "AAAAAAAAAA";
    private static final String UPDATED_ESCALA = "BBBBBBBBBB";

    private static final Integer DEFAULT_IDPROGRAMA = 1;
    private static final Integer UPDATED_IDPROGRAMA = 2;

    private static final String DEFAULT_LINEA = "AAAAAAAAAA";
    private static final String UPDATED_LINEA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DIAS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DIAS = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ProgramavueloRepository programavueloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProgramavueloMockMvc;

    private Programavuelo programavuelo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Programavuelo createEntity(EntityManager em) {
        Programavuelo programavuelo = new Programavuelo()
            .escala(DEFAULT_ESCALA)
            .idprograma(DEFAULT_IDPROGRAMA)
            .linea(DEFAULT_LINEA)
            .dias(DEFAULT_DIAS);
        return programavuelo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Programavuelo createUpdatedEntity(EntityManager em) {
        Programavuelo programavuelo = new Programavuelo()
            .escala(UPDATED_ESCALA)
            .idprograma(UPDATED_IDPROGRAMA)
            .linea(UPDATED_LINEA)
            .dias(UPDATED_DIAS);
        return programavuelo;
    }

    @BeforeEach
    public void initTest() {
        programavuelo = createEntity(em);
    }

    @Test
    @Transactional
    public void createProgramavuelo() throws Exception {
        int databaseSizeBeforeCreate = programavueloRepository.findAll().size();
        // Create the Programavuelo
        restProgramavueloMockMvc.perform(post("/api/programavuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programavuelo)))
            .andExpect(status().isCreated());

        // Validate the Programavuelo in the database
        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeCreate + 1);
        Programavuelo testProgramavuelo = programavueloList.get(programavueloList.size() - 1);
        assertThat(testProgramavuelo.getEscala()).isEqualTo(DEFAULT_ESCALA);
        assertThat(testProgramavuelo.getIdprograma()).isEqualTo(DEFAULT_IDPROGRAMA);
        assertThat(testProgramavuelo.getLinea()).isEqualTo(DEFAULT_LINEA);
        assertThat(testProgramavuelo.getDias()).isEqualTo(DEFAULT_DIAS);
    }

    @Test
    @Transactional
    public void createProgramavueloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programavueloRepository.findAll().size();

        // Create the Programavuelo with an existing ID
        programavuelo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgramavueloMockMvc.perform(post("/api/programavuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programavuelo)))
            .andExpect(status().isBadRequest());

        // Validate the Programavuelo in the database
        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEscalaIsRequired() throws Exception {
        int databaseSizeBeforeTest = programavueloRepository.findAll().size();
        // set the field null
        programavuelo.setEscala(null);

        // Create the Programavuelo, which fails.


        restProgramavueloMockMvc.perform(post("/api/programavuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programavuelo)))
            .andExpect(status().isBadRequest());

        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdprogramaIsRequired() throws Exception {
        int databaseSizeBeforeTest = programavueloRepository.findAll().size();
        // set the field null
        programavuelo.setIdprograma(null);

        // Create the Programavuelo, which fails.


        restProgramavueloMockMvc.perform(post("/api/programavuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programavuelo)))
            .andExpect(status().isBadRequest());

        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLineaIsRequired() throws Exception {
        int databaseSizeBeforeTest = programavueloRepository.findAll().size();
        // set the field null
        programavuelo.setLinea(null);

        // Create the Programavuelo, which fails.


        restProgramavueloMockMvc.perform(post("/api/programavuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programavuelo)))
            .andExpect(status().isBadRequest());

        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDiasIsRequired() throws Exception {
        int databaseSizeBeforeTest = programavueloRepository.findAll().size();
        // set the field null
        programavuelo.setDias(null);

        // Create the Programavuelo, which fails.


        restProgramavueloMockMvc.perform(post("/api/programavuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programavuelo)))
            .andExpect(status().isBadRequest());

        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProgramavuelos() throws Exception {
        // Initialize the database
        programavueloRepository.saveAndFlush(programavuelo);

        // Get all the programavueloList
        restProgramavueloMockMvc.perform(get("/api/programavuelos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programavuelo.getId().intValue())))
            .andExpect(jsonPath("$.[*].escala").value(hasItem(DEFAULT_ESCALA)))
            .andExpect(jsonPath("$.[*].idprograma").value(hasItem(DEFAULT_IDPROGRAMA)))
            .andExpect(jsonPath("$.[*].linea").value(hasItem(DEFAULT_LINEA)))
            .andExpect(jsonPath("$.[*].dias").value(hasItem(DEFAULT_DIAS.toString())));
    }
    
    @Test
    @Transactional
    public void getProgramavuelo() throws Exception {
        // Initialize the database
        programavueloRepository.saveAndFlush(programavuelo);

        // Get the programavuelo
        restProgramavueloMockMvc.perform(get("/api/programavuelos/{id}", programavuelo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(programavuelo.getId().intValue()))
            .andExpect(jsonPath("$.escala").value(DEFAULT_ESCALA))
            .andExpect(jsonPath("$.idprograma").value(DEFAULT_IDPROGRAMA))
            .andExpect(jsonPath("$.linea").value(DEFAULT_LINEA))
            .andExpect(jsonPath("$.dias").value(DEFAULT_DIAS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProgramavuelo() throws Exception {
        // Get the programavuelo
        restProgramavueloMockMvc.perform(get("/api/programavuelos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProgramavuelo() throws Exception {
        // Initialize the database
        programavueloRepository.saveAndFlush(programavuelo);

        int databaseSizeBeforeUpdate = programavueloRepository.findAll().size();

        // Update the programavuelo
        Programavuelo updatedProgramavuelo = programavueloRepository.findById(programavuelo.getId()).get();
        // Disconnect from session so that the updates on updatedProgramavuelo are not directly saved in db
        em.detach(updatedProgramavuelo);
        updatedProgramavuelo
            .escala(UPDATED_ESCALA)
            .idprograma(UPDATED_IDPROGRAMA)
            .linea(UPDATED_LINEA)
            .dias(UPDATED_DIAS);

        restProgramavueloMockMvc.perform(put("/api/programavuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProgramavuelo)))
            .andExpect(status().isOk());

        // Validate the Programavuelo in the database
        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeUpdate);
        Programavuelo testProgramavuelo = programavueloList.get(programavueloList.size() - 1);
        assertThat(testProgramavuelo.getEscala()).isEqualTo(UPDATED_ESCALA);
        assertThat(testProgramavuelo.getIdprograma()).isEqualTo(UPDATED_IDPROGRAMA);
        assertThat(testProgramavuelo.getLinea()).isEqualTo(UPDATED_LINEA);
        assertThat(testProgramavuelo.getDias()).isEqualTo(UPDATED_DIAS);
    }

    @Test
    @Transactional
    public void updateNonExistingProgramavuelo() throws Exception {
        int databaseSizeBeforeUpdate = programavueloRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgramavueloMockMvc.perform(put("/api/programavuelos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programavuelo)))
            .andExpect(status().isBadRequest());

        // Validate the Programavuelo in the database
        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProgramavuelo() throws Exception {
        // Initialize the database
        programavueloRepository.saveAndFlush(programavuelo);

        int databaseSizeBeforeDelete = programavueloRepository.findAll().size();

        // Delete the programavuelo
        restProgramavueloMockMvc.perform(delete("/api/programavuelos/{id}", programavuelo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Programavuelo> programavueloList = programavueloRepository.findAll();
        assertThat(programavueloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
