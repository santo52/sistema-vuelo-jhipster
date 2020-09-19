import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVuelo, defaultValue } from 'app/shared/model/vuelo.model';

export const ACTION_TYPES = {
  FETCH_VUELO_LIST: 'vuelo/FETCH_VUELO_LIST',
  FETCH_VUELO: 'vuelo/FETCH_VUELO',
  CREATE_VUELO: 'vuelo/CREATE_VUELO',
  UPDATE_VUELO: 'vuelo/UPDATE_VUELO',
  DELETE_VUELO: 'vuelo/DELETE_VUELO',
  RESET: 'vuelo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVuelo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VueloState = Readonly<typeof initialState>;

// Reducer

export default (state: VueloState = initialState, action): VueloState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VUELO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VUELO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VUELO):
    case REQUEST(ACTION_TYPES.UPDATE_VUELO):
    case REQUEST(ACTION_TYPES.DELETE_VUELO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VUELO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VUELO):
    case FAILURE(ACTION_TYPES.CREATE_VUELO):
    case FAILURE(ACTION_TYPES.UPDATE_VUELO):
    case FAILURE(ACTION_TYPES.DELETE_VUELO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VUELO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VUELO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VUELO):
    case SUCCESS(ACTION_TYPES.UPDATE_VUELO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VUELO):
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

const apiUrl = 'api/vuelos';

// Actions

export const getEntities: ICrudGetAllAction<IVuelo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VUELO_LIST,
  payload: axios.get<IVuelo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVuelo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VUELO,
    payload: axios.get<IVuelo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVuelo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VUELO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVuelo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VUELO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVuelo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VUELO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
