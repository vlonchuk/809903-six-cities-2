import React from 'react';
import renderer from 'react-test-renderer';
import Sort from './sort';

it(`Sort correctly renders after relaunch`, () => {
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

  const tree = renderer
    .create(<Sort options={options}
      activeOption={options[0]}
      opened={true}
      properties={properties}
      onArrowClick={onArrowClick}
      onOptionClick={onOptionClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
