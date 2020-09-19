import { IAvion } from 'app/shared/model/avion.model';
import { IProgramavuelo } from 'app/shared/model/programavuelo.model';

export interface IAeropuerto {
  id?: number;
  codigo?: number;
  nombre?: string;
  ciudad?: string;
  pais?: string;
  avions?: IAvion[];
  programavuelo?: IProgramavuelo;
}

export const defaultValue: Readonly<IAeropuerto> = {};
