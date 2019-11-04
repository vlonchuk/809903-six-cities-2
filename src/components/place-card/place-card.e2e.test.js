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
  };

  const mouseOverHandler = jest.fn();

  const app = shallow(<PlaceCard key={item.id} data={item} onMouseOver={mouseOverHandler} />);

  const anchor = app.find(`#prop-2`);
  anchor.simulate(`mouseover`);
  expect(mouseOverHandler).toHaveBeenCalledWith(item);
});
