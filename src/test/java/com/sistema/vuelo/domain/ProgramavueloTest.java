package com.sistema.vuelo.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sistema.vuelo.web.rest.TestUtil;

public class ProgramavueloTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Programavuelo.class);
        Programavuelo programavuelo1 = new Programavuelo();
        programavuelo1.setId(1L);
        Programavuelo programavuelo2 = new Programavuelo();
        programavuelo2.setId(programavuelo1.getId());
        assertThat(programavuelo1).isEqualTo(programavuelo2);
        programavuelo2.setId(2L);
        assertThat(programavuelo1).isNotEqualTo(programavuelo2);
        programavuelo1.setId(null);
        assertThat(programavuelo1).isNotEqualTo(programavuelo2);
    }
}
