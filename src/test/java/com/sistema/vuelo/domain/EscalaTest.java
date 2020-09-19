package com.sistema.vuelo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sistema.vuelo.web.rest.TestUtil;

public class EscalaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Escala.class);
        Escala escala1 = new Escala();
        escala1.setId(1L);
        Escala escala2 = new Escala();
        escala2.setId(escala1.getId());
        assertThat(escala1).isEqualTo(escala2);
        escala2.setId(2L);
        assertThat(escala1).isNotEqualTo(escala2);
        escala1.setId(null);
        assertThat(escala1).isNotEqualTo(escala2);
    }
}
