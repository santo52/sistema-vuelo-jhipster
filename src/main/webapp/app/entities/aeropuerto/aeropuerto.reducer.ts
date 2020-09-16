import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAeropuerto, defaultValue } from 'app/shared/model/aeropuerto.model';

export const ACTION_TYPES = {
  FETCH_AEROPUERTO_LIST: 'aeropuerto/FETCH_AEROPUERTO_LIST',
  FETCH_AEROPUERTO: 'aeropuerto/FETCH_AEROPUERTO',
  CREATE_AEROPUERTO: 'aeropuerto/CREATE_AEROPUERTO',
  UPDATE_AEROPUERTO: 'aeropuerto/UPDATE_AEROPUERTO',
  DELETE_AEROPUERTO: 'aeropuerto/DELETE_AEROPUERTO',
  RESET: 'aeropuerto/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAeropuerto>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AeropuertoState = Readonly<typeof initialState>;

// Reducer

export default (state: AeropuertoState = initialState, action): AeropuertoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AEROPUERTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AEROPUERTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AEROPUERTO):
    case REQUEST(ACTION_TYPES.UPDATE_AEROPUERTO):
    case REQUEST(ACTION_TYPES.DELETE_AEROPUERTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_AEROPUERTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AEROPUERTO):
    case FAILURE(ACTION_TYPES.CREATE_AEROPUERTO):
    case FAILURE(ACTION_TYPES.UPDATE_AEROPUERTO):
    case FAILURE(ACTION_TYPES.DELETE_AEROPUERTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AEROPUERTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AEROPUERTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AEROPUERTO):
    case SUCCESS(ACTION_TYPES.UPDATE_AEROPUERTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_AEROPUERTO):
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

const apiUrl = 'api/aeropuertos';

// Actions

export const getEntities: ICrudGetAllAction<IAeropuerto> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AEROPUERTO_LIST,
  payload: axios.get<IAeropuerto>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAeropuerto> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AEROPUERTO,
    payload: axios.get<IAeropuerto>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAeropuerto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AEROPUERTO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAeropuerto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AEROPUERTO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAeropuerto> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AEROPUERTO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
