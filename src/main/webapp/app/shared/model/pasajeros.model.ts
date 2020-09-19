import { IVuelo } from 'app/shared/model/vuelo.model';

export interface IPasajeros {
  id?: number;
  vuelo?: IVuelo;
}

export const defaultValue: Readonly<IPasajeros> = {};
