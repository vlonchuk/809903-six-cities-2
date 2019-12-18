import React from 'react';
import renderer from 'react-test-renderer';
import {Favorites} from './favorites';
import offers from './../../mocks/offers.js';
import {BrowserRouter as Router} from 'react-router-dom';

it(`Favorites correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <Router>
          <Favorites
            properties={offers}
            loadFavorites={jest.fn()}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
