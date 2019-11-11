import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import Map from './../map/map.jsx';

jest.mock(`./../map/map.jsx`, () => jest.fn().mockReturnValue(null));

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
    />)
    .toJSON();

  expect(Map).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});
