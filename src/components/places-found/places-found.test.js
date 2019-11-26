import React from 'react';
import renderer from 'react-test-renderer';
import PlacesFound from './places-found';

it(`PlacesFound correctly renders after relaunch`, () => {
  const city = `Paris`;
  const properties = [{
    id: `prop-2`,
    caption: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
  }];

  const tree = renderer
    .create(<PlacesFound city={city} properties={properties}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
