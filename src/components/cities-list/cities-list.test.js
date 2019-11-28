import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list';

it(`CitiesList correctly renders after relaunch`, () => {
  const offers = [{
    id: `prop-2`,
    city: `Paris`,
    caption: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
  }];

  const tree = renderer
    .create(<CitiesList selectedCity={offers[0].city} offers={offers}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
