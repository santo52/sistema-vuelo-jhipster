import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
// prettier-ignore
import aeropuerto, {
  AeropuertoState
} from 'app/entities/aeropuerto/aeropuerto.reducer';
// prettier-ignore
import vuelo, {
  VueloState
} from 'app/entities/vuelo/vuelo.reducer';
// prettier-ignore
import avion, {
  AvionState
} from 'app/entities/avion/avion.reducer';
// prettier-ignore
import pasajeros, {
  PasajerosState
} from 'app/entities/pasajeros/pasajeros.reducer';
// prettier-ignore
import escala, {
  EscalaState
} from 'app/entities/escala/escala.reducer';
import programavuelo, { ProgramavueloState } from 'app/entities/programavuelo/programavuelo.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly aeropuerto: AeropuertoState;
  readonly vuelo: VueloState;
  readonly avion: AvionState;
  readonly pasajeros: PasajerosState;
  readonly escala: EscalaState;
  readonly programavuelo: ProgramavueloState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  aeropuerto,
  vuelo,
  avion,
  pasajeros,
  escala,
  programavuelo,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
