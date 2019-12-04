import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard is correctly rendered after relaunch`, () => {
  const item = {
    id: `prop-2`,
    caption: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
    rating: 90,
  };

  const mouseEnterHandler = jest.fn();
  const mouseLeaveHandler = jest.fn();

  const app = shallow(<PlaceCard key={item.id} data={item}
    onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />);

  const anchor = app.find(`#prop-2`);

  anchor.simulate(`mouseenter`);
  expect(mouseEnterHandler).toHaveBeenCalledWith(item);

  anchor.simulate(`mouseleave`);
  expect(mouseLeaveHandler).toHaveBeenCalledWith();
});
