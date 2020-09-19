import { IVuelo } from 'app/shared/model/vuelo.model';

export interface IPasajeros {
  id?: number;
  nombre?: string;
  apellidos?: string;
  vuelo?: IVuelo;
}

export const defaultValue: Readonly<IPasajeros> = {};
