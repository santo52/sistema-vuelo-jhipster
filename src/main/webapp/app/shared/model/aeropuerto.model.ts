export interface IAeropuerto {
  id?: number;
  codigo?: number;
  nombre?: string;
  ciudad?: string;
  pais?: string;
}

export const defaultValue: Readonly<IAeropuerto> = {};
