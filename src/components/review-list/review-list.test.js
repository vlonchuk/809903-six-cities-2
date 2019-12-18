import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewList} from './review-list';
import reviewItem from './../../mocks/review-item.js';

jest.mock(`./../review-add/review-add.jsx`, () => jest.fn().mockReturnValue(null));

it(`ReviewList correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <ReviewList
          hotelId={1}
          comments={[reviewItem]}
          isAuthorizationRequired={false}
          review={reviewItem}
        />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
