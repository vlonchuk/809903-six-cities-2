import cities from './mocks/cities.js';
import {getPropertiesByCityId} from './mocks/cities.js';

const initialState = {
  cities,
  cityId: ``,
  properties: []
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_PROPERTIES: `GET_PROPERTIES`,
};

const ActionCreator = {
  changeCity: (cityId) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: cityId,
    };
  },

  getProperties: (cityId) => {
    return {
      type: ActionType.GET_PROPERTIES,
      payload: getPropertiesByCityId(cityId)
    };
  }
};

function reducer(state = initialState, action) {
  if (action.type === ActionType.CHANGE_CITY) {
    return Object.assign({}, state, {cityId: action.payload});
  }
  if (action.type === ActionType.GET_PROPERTIES) {
    return Object.assign({}, state, {properties: action.payload});
  }
  return state;
}

export {
  ActionCreator,
  reducer
};
