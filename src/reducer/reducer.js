import initialState from './initial-state/initial-state.js';
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
} from './action-type/action-type.js';

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
    case CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
    case SORT_OPEN_TOGGLE:
      return Object.assign({}, state, {sortOpened: action.payload});
    case SORT_ACTIVE_OPTION_CHANGE:
      return Object.assign({}, state, {sortActiveOption: action.payload});
    case ACTIVATE_CARD:
      return Object.assign({}, state, {activeCard: action.payload});
    case REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {isAuthorizationRequired: action.payload});
    case SAVE_USER:
      return Object.assign({}, state, {user: action.payload});
    case REMOVE_USER:
      return Object.assign({}, state, {user: null});
    case LOAD_COMMENTS:
      return Object.assign({}, state, {comments: action.payload});
    case LOAD_FAVORITES:
      return Object.assign({}, state, {favorites: action.payload});
    default:
      return state;
  }
}

export default reducer;
