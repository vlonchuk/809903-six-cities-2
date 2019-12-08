import initialState from './initial-state/initial-state.js';
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
} from './action-type/action-type.js';

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
    case CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
    case GET_PROPERTIES:
      return Object.assign({}, state, {properties: action.payload});
    case SORT_OPEN_TOGGLE:
      return Object.assign({}, state, {sortOpened: action.payload});
    case SORT_ACTIVE_OPTION_CHANGE:
      return Object.assign({}, state, {sortActiveOption: action.payload});
    case SORT_PROPERTIES:
      return Object.assign({}, state, {properties: action.payload});
    case ACTIVATE_CARD:
      return Object.assign({}, state, {activeCard: action.payload});
    case REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {isAuthorizationRequired: action.payload});
    case SAVE_USER:
      return Object.assign({}, state, {user: action.payload});
    case REMOVE_USER:
      return Object.assign({}, state, {user: null});
    default:
      return state;
  }
}

export default reducer;
