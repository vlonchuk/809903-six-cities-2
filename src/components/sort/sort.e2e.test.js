import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sort from './sort.jsx';
import SortType from './../../consts/sort-type.js';
import offers from './../../mocks/offers.js';

Enzyme.configure({adapter: new Adapter()});

it(`Sort correctly functions after relaunch`, () => {
  const options = Object.values(SortType);
  const onArrowClick = jest.fn();
  const onOptionClick = jest.fn();

  const app = shallow(<Sort options={options}
    activeOption={options[0]}
    opened={true}
    properties={offers}
    onArrowClick={onArrowClick}
    onOptionClick={onOptionClick}
  />);

  const anchorArrow = app.find(`.places__sorting-type`);
  anchorArrow.simulate(`click`);
  expect(onArrowClick).toHaveBeenCalledWith(true);

  const anchorItem = app.find(`.places__option--active`);
  anchorItem.simulate(`click`);
  expect(onOptionClick).toHaveBeenCalledWith(options[0], offers);
});
