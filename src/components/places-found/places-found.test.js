import React from 'react';
import renderer from 'react-test-renderer';
import PlacesFound from './places-found';
import offers from './../../mocks/offers.js';

it(`PlacesFound correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<PlacesFound city={offers[0].city.name} properties={offers}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
