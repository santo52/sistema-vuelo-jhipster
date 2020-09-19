import { Moment } from 'moment';

export interface IVuelo {
  id?: number;
  idvuelo?: string;
  fecha?: string;
}

export const defaultValue: Readonly<IVuelo> = {};
