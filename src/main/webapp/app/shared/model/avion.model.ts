import { IAeropuerto } from 'app/shared/model/aeropuerto.model';

export interface IAvion {
  id?: number;
  id_avion?: number;
  marca?: string;
  capacidad?: string;
  modelo?: string;
  aeropuertos?: IAeropuerto[];
}

export const defaultValue: Readonly<IAvion> = {};
