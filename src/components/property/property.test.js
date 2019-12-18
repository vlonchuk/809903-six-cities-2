import React from 'react';
import renderer from 'react-test-renderer';
import {Property} from './property';
import offers from './../../mocks/offers.js';
import user from './../../mocks/user.js';
import {BrowserRouter as Router} from 'react-router-dom';

jest.mock(`./../review-list/review-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`./../map/map.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`./../places-list/places-list.jsx`, () => jest.fn().mockReturnValue(null));

it(`ReviewAdd correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <Router>
          <Property
            id={1}
            user={user}
            property={offers[0]}
            properties={offers}
            mapProperties={offers}
            onAddToFavorite={jest.fn()}
          />
        </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
