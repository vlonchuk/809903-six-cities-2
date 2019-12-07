import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CitiesListItem from './cities-list-item.jsx';
import offers from './../../mocks/offers.js';

Enzyme.configure({adapter: new Adapter()});

it(`CitiesListItem correctly functions after relaunch`, () => {
  const city = `Paris`;
  const sortActiveOption = `Popular`;
  const handler = jest.fn();

  const app = shallow(<CitiesListItem city={city} onCityClick={handler} selected={true}
    sortActiveOption={sortActiveOption} offers={offers} />);

  const anchor = app.find(`a`);
  anchor.simulate(`click`);
  expect(handler).toHaveBeenCalledWith(city, sortActiveOption, offers);
});
