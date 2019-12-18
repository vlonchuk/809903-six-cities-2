import React from 'react';
import renderer from 'react-test-renderer';
import {Login} from './login';

jest.mock(`./../page-header/page-header.jsx`, () => jest.fn().mockReturnValue(null));

it(`Login correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<Login onLogin={jest.fn()}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
