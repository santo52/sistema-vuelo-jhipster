import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEscala, defaultValue } from 'app/shared/model/escala.model';

export const ACTION_TYPES = {
  FETCH_ESCALA_LIST: 'escala/FETCH_ESCALA_LIST',
  FETCH_ESCALA: 'escala/FETCH_ESCALA',
  CREATE_ESCALA: 'escala/CREATE_ESCALA',
  UPDATE_ESCALA: 'escala/UPDATE_ESCALA',
  DELETE_ESCALA: 'escala/DELETE_ESCALA',
  RESET: 'escala/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEscala>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EscalaState = Readonly<typeof initialState>;

// Reducer

export default (state: EscalaState = initialState, action): EscalaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESCALA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESCALA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ESCALA):
    case REQUEST(ACTION_TYPES.UPDATE_ESCALA):
    case REQUEST(ACTION_TYPES.DELETE_ESCALA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ESCALA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESCALA):
    case FAILURE(ACTION_TYPES.CREATE_ESCALA):
    case FAILURE(ACTION_TYPES.UPDATE_ESCALA):
    case FAILURE(ACTION_TYPES.DELETE_ESCALA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESCALA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESCALA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESCALA):
    case SUCCESS(ACTION_TYPES.UPDATE_ESCALA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESCALA):
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

const apiUrl = 'api/escalas';

// Actions

export const getEntities: ICrudGetAllAction<IEscala> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ESCALA_LIST,
  payload: axios.get<IEscala>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEscala> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESCALA,
    payload: axios.get<IEscala>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEscala> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESCALA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEscala> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESCALA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEscala> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESCALA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
