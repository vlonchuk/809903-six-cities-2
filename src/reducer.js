import offers from './mocks/offers';
import {SortType, sortPropertiesByOption} from './sort-func.js';
import {getPropertiesByCity} from './mocks/offers.js';

const initialState = {
  offers: [],
  city: ``,
  properties: [],
  sortOptions: [
    SortType.POPULAR,
    SortType.PRICE_LOW_TO_HIGH,
    SortType.PRICE_HIGH_TO_LOW,
    SortType.TOP_RATED_FIRST
  ],
  sortActiveOption: SortType.POPULAR,
  sortOpened: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  GET_PROPERTIES: `GET_PROPERTIES`,
  SORT_OPEN_TOGGLE: `SORT_OPEN_TOGGLE`,
  SORT_ACTIVE_OPTION_CHANGE: `SORT_ACTIVE_OPTION_CHANGE`,
  SORT_PROPERTIES: `SORT_PROPERTIES`,
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
  },

  sortOpenToggle: (opened) => {
    return {
      type: ActionType.SORT_OPEN_TOGGLE,
      payload: !opened
    };
  },

  sortActiveOptionChange: (option) => {
    return {
      type: ActionType.SORT_ACTIVE_OPTION_CHANGE,
      payload: option
    };
  },

  sortProperties: (option, properties) => {
    return {
      type: ActionType.SORT_PROPERTIES,
      payload: option === SortType.POPULAR && properties.length > 0 ?
        getPropertiesByCity(properties[0].city) : sortPropertiesByOption(option, properties)
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
  if (action.type === ActionType.SORT_OPEN_TOGGLE) {
    return Object.assign({}, state, {sortOpened: action.payload});
  }
  if (action.type === ActionType.SORT_ACTIVE_OPTION_CHANGE) {
    return Object.assign({}, state, {sortActiveOption: action.payload});
  }
  if (action.type === ActionType.SORT_PROPERTIES) {
    return Object.assign({}, state, {properties: action.payload});
  }
  return state;
}

export {
  ActionType,
  ActionCreator,
  reducer
};
