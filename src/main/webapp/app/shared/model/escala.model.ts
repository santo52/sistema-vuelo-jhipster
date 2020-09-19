import { IVuelo } from 'app/shared/model/vuelo.model';

export interface IEscala {
  id?: number;
  id_escala?: number;
  origen?: string;
  destino?: string;
  suben_pasajeros?: string;
  vuelo?: IVuelo;
}

export const defaultValue: Readonly<IEscala> = {};
