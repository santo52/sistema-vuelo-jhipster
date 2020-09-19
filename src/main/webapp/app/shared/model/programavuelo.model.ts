import { Moment } from 'moment';
import { IVuelo } from 'app/shared/model/vuelo.model';
import { IAeropuerto } from 'app/shared/model/aeropuerto.model';

export interface IProgramavuelo {
  id?: number;
  escala?: string;
  idprograma?: number;
  linea?: string;
  dias?: string;
  vuelo?: IVuelo;
  aeropuertos?: IAeropuerto[];
}

export const defaultValue: Readonly<IProgramavuelo> = {};
