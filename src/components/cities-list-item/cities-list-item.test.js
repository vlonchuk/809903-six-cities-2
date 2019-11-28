import React from 'react';
import renderer from 'react-test-renderer';
import CitiesListItem from './cities-list-item';

it(`CitiesListItem correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<CitiesListItem city={`Paris`} selected={true}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
