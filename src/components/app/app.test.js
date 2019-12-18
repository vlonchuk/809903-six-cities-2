import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import Main from './../main/main.jsx';
import offers from './../../mocks/offers.js';
import {BrowserRouter as Router} from 'react-router-dom';

jest.mock(`./../main/main.jsx`, () => jest.fn().mockReturnValue(null));

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <Router>
          <App offers={offers}
            getPropertyProps={jest.fn()}
            loadPropertyParams={jest.fn()}
          />
        </Router>
    )
    .toJSON();

  expect(Main).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});
