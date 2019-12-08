import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list';
import offers from './../../mocks/offers.js';

it(`CitiesList correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<CitiesList selectedCity={offers[0].city.name} offers={offers} sortActiveOption={`Popular`}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
