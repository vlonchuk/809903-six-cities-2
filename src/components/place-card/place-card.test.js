import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card';

it(`Main correctly renders after relaunch`, () => {
  const item = {
    id: `prop-2`,
    caption: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
    rating: 90,
  };

  const onMouseOver = () => {};
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  const tree = renderer
    .create(<PlaceCard key={item.id} data={item} onMouseOver={onMouseOver} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
