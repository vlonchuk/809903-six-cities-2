import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';
import offers from './../../mocks/offers.js';

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard correctly functions after relaunch`, () => {
  const item = offers[0];

  const mouseEnterHandler = jest.fn();
  const mouseLeaveHandler = jest.fn();

  const app = shallow(<PlaceCard key={item.id} data={item}
    onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />);

  const anchor = app.find(`article`);

  anchor.simulate(`mouseenter`);
  expect(mouseEnterHandler).toHaveBeenCalledWith(item);

  anchor.simulate(`mouseleave`);
  expect(mouseLeaveHandler).toHaveBeenCalledWith();
});
