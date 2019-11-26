import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import Main from './../main/main.jsx';

jest.mock(`./../main/main.jsx`, () => jest.fn().mockReturnValue(null));

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
    />)
    .toJSON();

  expect(Main).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});
