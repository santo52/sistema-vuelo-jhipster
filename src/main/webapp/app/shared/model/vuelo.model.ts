import { Moment } from 'moment';
import { IPasajeros } from 'app/shared/model/pasajeros.model';
import { IEscala } from 'app/shared/model/escala.model';

export interface IVuelo {
  id?: number;
  idvuelo?: string;
  fecha?: string;
  pasajeros?: IPasajeros[];
  escalas?: IEscala[];
}

export const defaultValue: Readonly<IVuelo> = {};
