import {ActionType, reducer} from './reducer';

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
  },
];

const initialState = {
  offers: [],
  city: ``,
  properties: []
};

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer successfully loads offers`, () => {
    expect(reducer(initialState, {
      type: ActionType.LOAD_OFFERS,
      payload: offers
    })).toEqual(Object.assign({}, initialState, {offers}));
  });

  const newCity = `Paris`;
  it(`Reducer correctly changes city`, () => {
    expect(reducer(initialState, {
      type: ActionType.CHANGE_CITY,
      payload: newCity
    })).toEqual(Object.assign({}, initialState, {city: newCity}));
  });

  it(`Reducer correctly gets properties`, () => {
    const oldState = Object.assign({}, initialState, {city: newCity});
    expect(reducer(oldState, {
      type: ActionType.GET_PROPERTIES,
      payload: offers
    })).toEqual(Object.assign({}, oldState, {properties: offers}));
  });
});
