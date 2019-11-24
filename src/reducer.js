import {CHANGE_CITY} from './consts/action_types.js';
import {GET_PROPERTIES} from './consts/action_types.js';

const initialState = {
  cityId: ``,
  properties: []
};

export function reducer(state = initialState, action) {
  if (action.type === CHANGE_CITY) {
    return Object.assign({}, state, {cityId: action.payLoad});
  }
  if (action.type === GET_PROPERTIES) {
    return Object.assign({}, state, {properties: action.payLoad});
  }
  return state;
}
