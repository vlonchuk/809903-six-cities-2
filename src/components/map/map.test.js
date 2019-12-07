import React from 'react';
import renderer from 'react-test-renderer';
import {Map} from './map';

it(`Map correctly renders after relaunch`, () => {
  const items = [{
    id: 2,
    city: {
      name: `Paris`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 8
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  }];

  const tree = renderer
    .create(<Map properties={items} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
