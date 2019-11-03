import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main';

Enzyme.configure({adapter: new Adapter()});

it(`App is correctly rendered after relaunch`, () => {
  const properties = [
    {
      id: `prop-2`,
      caption: `Wood and stone place`,
      imgSrc: `img/room.jpg`,
      type: `Private room`,
      priceCurrency: `€`,
      priceValue: 80,
      priceText: `night`,
    }
  ];

  const clickHandler = jest.fn();
  const app = shallow(<Main
    properties={properties}
    onClick={clickHandler} />);
  const anchor = app.find(`PlacesList`).dive().find(`PlaceCard`).dive().find(`.place-card__name > a`);
  anchor.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
