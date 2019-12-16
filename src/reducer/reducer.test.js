import reducer from './reducer';
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
import initialState from './initial-state/initial-state.js';
import offers from './../mocks/offers.js';
import user from './../mocks/user.js';
import comments from './../mocks/comments.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer successfully loads offers`, () => {
    expect(reducer(initialState, {
      type: LOAD_OFFERS,
      payload: offers
    })).toEqual(Object.assign({}, initialState, {offers}));
  });

  const newCity = `Paris`;
  it(`Reducer correctly changes city`, () => {
    expect(reducer(initialState, {
      type: CHANGE_CITY,
      payload: newCity
    })).toEqual(Object.assign({}, initialState, {city: newCity}));
  });

  it(`Reducer.SORT_OPEN_TOGGLE check OPEN sort list `, () => {
    expect(reducer(initialState, {
      type: SORT_OPEN_TOGGLE,
      payload: true
    })).toEqual(Object.assign({}, initialState, {sortOpened: true}));
  });

  it(`Reducer.SORT_OPEN_TOGGLE check CLOSE sort list `, () => {
    const oldState = Object.assign({}, initialState, {sortOpened: true});
    expect(reducer(oldState, {
      type: SORT_OPEN_TOGGLE,
      payload: false
    })).toEqual(Object.assign({}, initialState, {sortOpened: false}));
  });

  it(`Reducer.SORT_ACTIVE_OPTION_CHANGE`, () => {
    const newSortActiveOption = `Popular`;
    expect(reducer(initialState, {
      type: SORT_ACTIVE_OPTION_CHANGE,
      payload: newSortActiveOption
    })).toEqual(Object.assign({}, initialState, {sortActiveOption: newSortActiveOption}));
  });

  it(`Reducer.ACTIVATE_CARD`, () => {
    expect(reducer(initialState, {
      type: ACTIVATE_CARD,
      payload: offers[0]
    })).toEqual(Object.assign({}, initialState, {activeCard: offers[0]}));
  });

  it(`Reducer.REQUIRED_AUTHORIZATION: true`, () => {
    expect(reducer(initialState, {
      type: REQUIRED_AUTHORIZATION,
      payload: true
    })).toEqual(Object.assign({}, initialState, {isAuthorizationRequired: true}));
  });

  it(`Reducer.REQUIRED_AUTHORIZATION: false`, () => {
    expect(reducer(Object.assign({}, initialState, {isAuthorizationRequired: true}), {
      type: REQUIRED_AUTHORIZATION,
      payload: false
    })).toEqual(Object.assign({}, initialState, {isAuthorizationRequired: false}));
  });

  it(`Reducer.SAVE_USER`, () => {
    expect(reducer(initialState, {
      type: SAVE_USER,
      payload: user
    })).toEqual(Object.assign({}, initialState, {user}));
  });

  it(`Reducer.REMOVE_USER`, () => {
    expect(reducer(Object.assign({}, initialState, {user}), {
      type: REMOVE_USER,
    })).toEqual(Object.assign({}, initialState, {user: null}));
  });

  it(`Reducer correctly loads comments`, () => {
    expect(reducer(initialState, {
      type: LOAD_COMMENTS,
      payload: comments
    })).toEqual(Object.assign({}, initialState, {comments}));
  });

  it(`Reducer correctly loads favorites`, () => {
    expect(reducer(initialState, {
      type: LOAD_FAVORITES,
      payload: offers
    })).toEqual(Object.assign({}, initialState, {favorites: offers}));
  });
});
