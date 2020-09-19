import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/avion">
      Avion
    </MenuItem>
    <MenuItem icon="asterisk" to="/vuelo">
      Vuelo
    </MenuItem>
    <MenuItem icon="asterisk" to="/aeropuerto">
      Aeropuerto
    </MenuItem>
    <MenuItem icon="asterisk" to="/pasajeros">
      Pasajeros
    </MenuItem>
<<<<<<< HEAD
    <MenuItem icon="asterisk" to="/escala">
      Escala
=======
    <MenuItem icon="asterisk" to="/programavuelo">
      Programavuelo
>>>>>>> 5a66fe54c0da73fd0f2b900632f17561486c5f33
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
