import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPasajeros, defaultValue } from 'app/shared/model/pasajeros.model';

export const ACTION_TYPES = {
  FETCH_PASAJEROS_LIST: 'pasajeros/FETCH_PASAJEROS_LIST',
  FETCH_PASAJEROS: 'pasajeros/FETCH_PASAJEROS',
  CREATE_PASAJEROS: 'pasajeros/CREATE_PASAJEROS',
  UPDATE_PASAJEROS: 'pasajeros/UPDATE_PASAJEROS',
  DELETE_PASAJEROS: 'pasajeros/DELETE_PASAJEROS',
  RESET: 'pasajeros/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPasajeros>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PasajerosState = Readonly<typeof initialState>;

// Reducer

export default (state: PasajerosState = initialState, action): PasajerosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PASAJEROS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PASAJEROS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PASAJEROS):
    case REQUEST(ACTION_TYPES.UPDATE_PASAJEROS):
    case REQUEST(ACTION_TYPES.DELETE_PASAJEROS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PASAJEROS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PASAJEROS):
    case FAILURE(ACTION_TYPES.CREATE_PASAJEROS):
    case FAILURE(ACTION_TYPES.UPDATE_PASAJEROS):
    case FAILURE(ACTION_TYPES.DELETE_PASAJEROS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASAJEROS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASAJEROS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PASAJEROS):
    case SUCCESS(ACTION_TYPES.UPDATE_PASAJEROS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PASAJEROS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/pasajeros';

// Actions

export const getEntities: ICrudGetAllAction<IPasajeros> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PASAJEROS_LIST,
  payload: axios.get<IPasajeros>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPasajeros> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PASAJEROS,
    payload: axios.get<IPasajeros>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPasajeros> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PASAJEROS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPasajeros> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PASAJEROS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPasajeros> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PASAJEROS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
