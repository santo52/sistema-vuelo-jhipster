import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAvion, defaultValue } from 'app/shared/model/avion.model';

export const ACTION_TYPES = {
  FETCH_AVION_LIST: 'avion/FETCH_AVION_LIST',
  FETCH_AVION: 'avion/FETCH_AVION',
  CREATE_AVION: 'avion/CREATE_AVION',
  UPDATE_AVION: 'avion/UPDATE_AVION',
  DELETE_AVION: 'avion/DELETE_AVION',
  RESET: 'avion/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAvion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AvionState = Readonly<typeof initialState>;

// Reducer

export default (state: AvionState = initialState, action): AvionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AVION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AVION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AVION):
    case REQUEST(ACTION_TYPES.UPDATE_AVION):
    case REQUEST(ACTION_TYPES.DELETE_AVION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_AVION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AVION):
    case FAILURE(ACTION_TYPES.CREATE_AVION):
    case FAILURE(ACTION_TYPES.UPDATE_AVION):
    case FAILURE(ACTION_TYPES.DELETE_AVION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AVION):
    case SUCCESS(ACTION_TYPES.UPDATE_AVION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_AVION):
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

const apiUrl = 'api/avions';

// Actions

export const getEntities: ICrudGetAllAction<IAvion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AVION_LIST,
  payload: axios.get<IAvion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAvion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AVION,
    payload: axios.get<IAvion>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAvion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AVION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAvion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AVION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAvion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AVION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
