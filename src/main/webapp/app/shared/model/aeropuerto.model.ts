import { IAvion } from 'app/shared/model/avion.model';

export interface IAeropuerto {
  id?: number;
  codigo?: number;
  nombre?: string;
  ciudad?: string;
  pais?: string;
  avions?: IAvion[];
}

export const defaultValue: Readonly<IAeropuerto> = {};
