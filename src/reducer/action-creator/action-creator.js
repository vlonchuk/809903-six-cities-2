import offers from './../../mocks/offers.js';
import {getPropertiesByCity} from './../../mocks/offers.js';
import {SortType, sortPropertiesByOption} from './../../sort-func.js';

import {
  LOAD_OFFERS,
  CHANGE_CITY,
  GET_PROPERTIES,
  SORT_OPEN_TOGGLE,
  SORT_ACTIVE_OPTION_CHANGE,
  SORT_PROPERTIES,
  ACTIVATE_CARD
} from './../action-type/action-type.js';

const ActionCreator = {
  loadOffers: () => {
    return {
      type: LOAD_OFFERS,
      payload: offers,
    };
  },

  changeCity: (city) => {
    return {
      type: CHANGE_CITY,
      payload: city,
    };
  },

  getProperties: (city) => {
    return {
      type: GET_PROPERTIES,
      payload: getPropertiesByCity(city)
    };
  },

  sortOpenToggle: (opened) => {
    return {
      type: SORT_OPEN_TOGGLE,
      payload: !opened
    };
  },

  sortActiveOptionChange: (option) => {
    return {
      type: SORT_ACTIVE_OPTION_CHANGE,
      payload: option
    };
  },

  sortProperties: (option, properties) => {
    return {
      type: SORT_PROPERTIES,
      payload: option === SortType.POPULAR && properties.length > 0 ?
        getPropertiesByCity(properties[0].city) : sortPropertiesByOption(option, properties)
    };
  },

  activateCard: (card) => {
    return {
      type: ACTIVATE_CARD,
      payload: card
    };
  }
};

export default ActionCreator;
