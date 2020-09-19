import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProgramavuelo, defaultValue } from 'app/shared/model/programavuelo.model';

export const ACTION_TYPES = {
  FETCH_PROGRAMAVUELO_LIST: 'programavuelo/FETCH_PROGRAMAVUELO_LIST',
  FETCH_PROGRAMAVUELO: 'programavuelo/FETCH_PROGRAMAVUELO',
  CREATE_PROGRAMAVUELO: 'programavuelo/CREATE_PROGRAMAVUELO',
  UPDATE_PROGRAMAVUELO: 'programavuelo/UPDATE_PROGRAMAVUELO',
  DELETE_PROGRAMAVUELO: 'programavuelo/DELETE_PROGRAMAVUELO',
  RESET: 'programavuelo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProgramavuelo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProgramavueloState = Readonly<typeof initialState>;

// Reducer

export default (state: ProgramavueloState = initialState, action): ProgramavueloState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROGRAMAVUELO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROGRAMAVUELO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROGRAMAVUELO):
    case REQUEST(ACTION_TYPES.UPDATE_PROGRAMAVUELO):
    case REQUEST(ACTION_TYPES.DELETE_PROGRAMAVUELO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROGRAMAVUELO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROGRAMAVUELO):
    case FAILURE(ACTION_TYPES.CREATE_PROGRAMAVUELO):
    case FAILURE(ACTION_TYPES.UPDATE_PROGRAMAVUELO):
    case FAILURE(ACTION_TYPES.DELETE_PROGRAMAVUELO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROGRAMAVUELO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROGRAMAVUELO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROGRAMAVUELO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROGRAMAVUELO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROGRAMAVUELO):
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

const apiUrl = 'api/programavuelos';

// Actions

export const getEntities: ICrudGetAllAction<IProgramavuelo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROGRAMAVUELO_LIST,
  payload: axios.get<IProgramavuelo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProgramavuelo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROGRAMAVUELO,
    payload: axios.get<IProgramavuelo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProgramavuelo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROGRAMAVUELO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProgramavuelo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROGRAMAVUELO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProgramavuelo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROGRAMAVUELO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
