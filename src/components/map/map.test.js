import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map';

it(`Map correctly renders after relaunch`, () => {
  const items = [{
    id: `prop-2`,
    caption: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
    coor: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
  }];

  const tree = renderer
    .create(<Map properties={items} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
