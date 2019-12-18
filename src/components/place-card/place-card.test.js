import React from 'react';
import renderer from 'react-test-renderer';
import {PlaceCard} from './place-card';
import offers from './../../mocks/offers.js';
import {BrowserRouter as Router} from 'react-router-dom';
import PlacesListType from './../../consts/places-list-type';

it(`PlaceCard correctly renders after relaunch`, () => {
  const item = offers[0];

  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  const tree = renderer
    .create(
        <Router>
          <PlaceCard key={item.id} data={item} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
            listType={PlacesListType.CITY}
            favorites={[]}
            onAddToFavorite={jest.fn()}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
