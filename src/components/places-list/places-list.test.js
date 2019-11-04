import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from './places-list';

it(`Main correctly renders after relaunch`, () => {
  const properties = [
    {
      id: `prop-2`,
      caption: `Wood and stone place`,
      imgSrc: `img/room.jpg`,
      type: `Private room`,
      priceCurrency: `€`,
      priceValue: 80,
      priceText: `night`,
    },
  ];

  const tree = renderer
    .create(<PlacesList key="PlacesList" properties={properties} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
