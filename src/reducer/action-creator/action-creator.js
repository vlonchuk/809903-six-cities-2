import {getPropertiesByCity} from './../../utils.js';
import SortType from './../../consts/sort-type.js';
import {sortPropertiesByOption} from '../../utils.js';

import {
  LOAD_OFFERS,
  CHANGE_CITY,
  GET_PROPERTIES,
  SORT_OPEN_TOGGLE,
  SORT_ACTIVE_OPTION_CHANGE,
  SORT_PROPERTIES,
  ACTIVATE_CARD,
  REQUIRED_AUTHORIZATION,
  SAVE_USER,
  REMOVE_USER,
} from './../action-type/action-type.js';

const ActionCreator = {
  requireAuthorization: (isAuthorizationRequired) => {
    return {
      type: REQUIRED_AUTHORIZATION,
      payload: isAuthorizationRequired
    };
  },

  saveUser: (user) => {
    return {
      type: SAVE_USER,
      payload: user
    };
  },

  removeUser: () => {
    return {
      type: REMOVE_USER,
    };
  },

  loadOffers: (offers) => {
    return {
      type: LOAD_OFFERS,
      payload: offers
    };
  },

  changeCity: (city) => {
    return {
      type: CHANGE_CITY,
      payload: city
    };
  },

  getProperties: (city, offers) => {
    return {
      type: GET_PROPERTIES,
      payload: getPropertiesByCity(city, offers)
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

  sortProperties: (option, properties, offers) => {
    return {
      type: SORT_PROPERTIES,
      payload: option === SortType.POPULAR && properties.length > 0 ?
        getPropertiesByCity(properties[0].city, offers) : sortPropertiesByOption(option, properties)
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
