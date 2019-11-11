import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';
import Map from './../map/map.jsx';

jest.mock(`./../map/map.jsx`, () => jest.fn().mockReturnValue(null));

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
    .create(<Main
      properties={properties}
    />)
    .toJSON();

  expect(Map).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});
