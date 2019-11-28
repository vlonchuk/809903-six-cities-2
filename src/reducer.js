import offers from './mocks/offers';
import {getPropertiesByCity} from './mocks/offers.js';

const initialState = {
  offers: [],
  city: ``,
  properties: []
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  GET_PROPERTIES: `GET_PROPERTIES`,
};

const ActionCreator = {
  loadOffers: () => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },

  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
  },

  getProperties: (city) => {
    return {
      type: ActionType.GET_PROPERTIES,
      payload: getPropertiesByCity(city)
    };
  }
};

function reducer(state = initialState, action) {
  if (action.type === ActionType.LOAD_OFFERS) {
    return Object.assign({}, state, {offers: action.payload});
  }
  if (action.type === ActionType.CHANGE_CITY) {
    return Object.assign({}, state, {city: action.payload});
  }
  if (action.type === ActionType.GET_PROPERTIES) {
    return Object.assign({}, state, {properties: action.payload});
  }
  return state;
}

export {
  ActionType,
  ActionCreator,
  reducer
};
