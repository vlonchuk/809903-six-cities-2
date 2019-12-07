import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card';
import offers from './../../mocks/offers.js';

it(`PlaceCard correctly renders after relaunch`, () => {
  const item = offers[0];

  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  const tree = renderer
    .create(<PlaceCard key={item.id} data={item} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
