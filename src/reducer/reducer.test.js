import reducer from './reducer';
import {
  LOAD_OFFERS,
  CHANGE_CITY,
  GET_PROPERTIES,
  SORT_OPEN_TOGGLE,
  SORT_ACTIVE_OPTION_CHANGE,
  SORT_PROPERTIES,
  ACTIVATE_CARD,
  REQUIRED_AUTHORIZATION
} from './action-type/action-type.js';
import initialState from './initial-state/initial-state.js';

const offers = [
  {
    id: `prop-1`,
    city: `Amsterdam`,
    caption: `Beautiful & luxurious apartment at great location`,
    imgSrc: `img/apartment-01.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 120,
    priceText: `night`,
    coor: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
    rating: 90,
  },
  {
    id: `prop-2`,
    city: `Amsterdam`,
    caption: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
    coor: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    rating: 30,
  },
];

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

  it(`Reducer correctly gets properties`, () => {
    const oldState = Object.assign({}, initialState, {city: newCity});
    expect(reducer(oldState, {
      type: GET_PROPERTIES,
      payload: offers
    })).toEqual(Object.assign({}, oldState, {properties: offers}));
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

  it(`Reducer.SORT_PROPERTIES  `, () => {
    const oldState = Object.assign({}, initialState, {city: newCity, properties: offers});
    const newProperties = offers.slice().sort((p1, p2) => p2.rating - p1.rating);
    expect(reducer(oldState, {
      type: SORT_PROPERTIES,
      payload: newProperties
    })).toEqual(Object.assign({}, oldState, {properties: newProperties}));
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
});
