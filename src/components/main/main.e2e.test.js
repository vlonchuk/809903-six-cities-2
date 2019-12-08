import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Main} from './main';
import SortType from './../../consts/sort-type.js';
import offers from './../../mocks/offers.js';

Enzyme.configure({adapter: new Adapter()});

it(`Main correctly functions after relaunch`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<Main
    city={offers[0].city.name}
    offers={offers}
    properties={offers}
    sortOptions={[SortType.POPULAR]}
    sortActiveOption={`Popular`}
    sortOpened={false}
    onSortArrowClick={jest.fn()}
    onSortOptionClick={jest.fn()}
    onPlaceCardMouseEnter={jest.fn()}
    onPlaceCardMouseLeave={jest.fn()}
    selectedCity={``}
    onClick={clickHandler}
    isAuthorizationRequired={false}
    onLogin={jest.fn()}
    loadOffers={jest.fn()} />);
  const anchor = app.find(`CitiesPlaces`).dive().find(`PlacesList`).dive().find(`PlaceCard`).dive().find(`.place-card__name > a`);
  anchor.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
