import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';
import NotFoundPage from './not-found-page';

it(`NotFoundPage correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <Router>
          <NotFoundPage />
        </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
