import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from './places-list';
import offers from './../../mocks/offers.js';

it(`PlacesList correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<PlacesList key="PlacesList" properties={offers}
      onPlaceCardMouseEnter={jest.fn()}
      onPlaceCardMouseLeave={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
