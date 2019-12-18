import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewAdd} from './review-add';

it(`ReviewAdd correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <ReviewAdd
          hotelId={1}
          onAddComment={jest.fn()}
        />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
