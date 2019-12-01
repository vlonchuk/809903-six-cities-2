import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sort from './sort.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Sort correctly functions after relaunch`, () => {
  const properties = [
    {
      id: `prop-2`,
      city: `Paris`,
      caption: `Wood and stone place`,
      imgSrc: `img/room.jpg`,
      type: `Private room`,
      priceCurrency: `€`,
      priceValue: 80,
      priceText: `night`,
      rating: 90,
    },
  ];


  const options = [
    `Popular`,
    `Price: low to high`,
    `Price: high to low`,
    `Top rated first`
  ];

  const onArrowClick = jest.fn();
  const onOptionClick = jest.fn();

  const app = shallow(<Sort options={options}
    activeOption={options[0]}
    opened={true}
    properties={properties}
    onArrowClick={onArrowClick}
    onOptionClick={onOptionClick}
  />);

  const anchorArrow = app.find(`.places__sorting-type`);
  anchorArrow.simulate(`click`);
  expect(onArrowClick).toHaveBeenCalledWith(true);

  const anchorItem = app.find(`.places__option--active`);
  anchorItem.simulate(`click`);
  expect(onOptionClick).toHaveBeenCalledWith(options[0], properties);
});
