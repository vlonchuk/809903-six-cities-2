import React from 'react';
import renderer from 'react-test-renderer';
import {PlacesList} from './places-list';
import offers from './../../mocks/offers.js';
import PlacesListType from './../../consts/places-list-type';

jest.mock(`./../place-card/place-card.jsx`, () => jest.fn().mockReturnValue(null));

it(`PlacesList correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<PlacesList key="PlacesList" properties={offers}
      onPlaceCardMouseEnter={jest.fn()}
      onPlaceCardMouseLeave={jest.fn()}
      onAddToFavorite={jest.fn()}
      listType={PlacesListType.CITY}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
