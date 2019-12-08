import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CitiesList from './cities-list.jsx';
import offers from './../../mocks/offers.js';

Enzyme.configure({adapter: new Adapter()});

it(`CitiesList correctly functions after relaunch`, () => {
  const handler = jest.fn();
  const sortActiveOption = `Popular`;
  const app = shallow(<CitiesList selectedCity={offers[0].city.name} offers={offers} onCityClick={handler}
    sortActiveOption={sortActiveOption} />);
  const anchor = app.find(`CitiesListItem`).dive().find(`a`);
  anchor.simulate(`click`);
  expect(handler).toHaveBeenCalledWith(offers[0].city.name, sortActiveOption, offers);
});
