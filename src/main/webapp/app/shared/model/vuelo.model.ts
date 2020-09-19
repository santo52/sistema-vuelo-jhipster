import { Moment } from 'moment';
import { IPasajeros } from 'app/shared/model/pasajeros.model';

export interface IVuelo {
  id?: number;
  idvuelo?: string;
  fecha?: string;
  pasajeros?: IPasajeros[];
}

export const defaultValue: Readonly<IVuelo> = {};
