import React from 'react';
import renderer from 'react-test-renderer';
import PageHeader from './page-header';
import {BrowserRouter as Router} from 'react-router-dom';

it(`PageHeader correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <Router>
          <PageHeader />
        </Router>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
