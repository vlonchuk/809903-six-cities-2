import React from 'react';
import renderer from 'react-test-renderer';
import ReviewItem from './review-item';
import reviewItem from './../../mocks/review-item.js';

it(`ReviewItem correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <ReviewItem review={reviewItem}/>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
