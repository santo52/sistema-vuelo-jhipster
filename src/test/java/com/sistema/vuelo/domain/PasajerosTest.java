package com.sistema.vuelo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sistema.vuelo.web.rest.TestUtil;

public class PasajerosTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pasajeros.class);
        Pasajeros pasajeros1 = new Pasajeros();
        pasajeros1.setId(1L);
        Pasajeros pasajeros2 = new Pasajeros();
        pasajeros2.setId(pasajeros1.getId());
        assertThat(pasajeros1).isEqualTo(pasajeros2);
        pasajeros2.setId(2L);
        assertThat(pasajeros1).isNotEqualTo(pasajeros2);
        pasajeros1.setId(null);
        assertThat(pasajeros1).isNotEqualTo(pasajeros2);
    }
}
