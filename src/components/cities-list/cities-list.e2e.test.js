import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CitiesList from './cities-list.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`CitiesList correctly functions after relaunch`, () => {
  const offers = [{
    id: `prop-2`,
    city: `Paris`,
    caption: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
  }];

  const handler = jest.fn();
  const app = shallow(<CitiesList selectedCity={offers[0].city} offers={offers} onCityClick={handler} />);
  const anchor = app.find(`CitiesListItem`).dive().find(`a`);
  anchor.simulate(`click`);
  expect(handler).toHaveBeenCalledWith(offers[0].city);
});
