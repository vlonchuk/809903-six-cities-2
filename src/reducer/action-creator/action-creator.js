import {
  LOAD_OFFERS,
  CHANGE_CITY,
  SORT_OPEN_TOGGLE,
  SORT_ACTIVE_OPTION_CHANGE,
  ACTIVATE_CARD,
  REQUIRED_AUTHORIZATION,
  SAVE_USER,
  REMOVE_USER,
  LOAD_COMMENTS,
  LOAD_FAVORITES,
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

  activateCard: (card) => {
    return {
      type: ACTIVATE_CARD,
      payload: card
    };
  },

  loadComments: (comments) => {
    const sortedComments = comments.sort((c1, c2) => (new Date(c2.date)).getTime() - (new Date(c1.date)).getTime());
    return {
      type: LOAD_COMMENTS,
      payload: sortedComments
    };
  },

  loadFavorites: (favorites) => {
    return {
      type: LOAD_FAVORITES,
      payload: favorites
    };
  },
};

export default ActionCreator;
