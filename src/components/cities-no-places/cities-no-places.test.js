import React from 'react';
import renderer from 'react-test-renderer';
import CitiesNoPlaces from './cities-no-places';

it(`CitiesNoPlaces correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<CitiesNoPlaces city={`Paris`} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
