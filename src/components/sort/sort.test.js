import React from 'react';
import renderer from 'react-test-renderer';
import Sort from './sort';
import SortType from './../../consts/sort-type.js';
import offers from './../../mocks/offers.js';

it(`Sort correctly renders after relaunch`, () => {
  const options = Object.values(SortType);
  const onArrowClick = jest.fn();
  const onOptionClick = jest.fn();

  const tree = renderer
    .create(<Sort options={options}
      activeOption={options[0]}
      opened={true}
      properties={offers}
      onArrowClick={onArrowClick}
      onOptionClick={onOptionClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
