import React from 'react';
import renderer from 'react-test-renderer';
import CitiesListItem from './cities-list-item';
import offers from './../../mocks/offers.js';

it(`CitiesListItem correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<CitiesListItem city={`Paris`} selected={true} sortActiveOption={`Popular`} offers={offers} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
