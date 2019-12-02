import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Main} from './main';

Enzyme.configure({adapter: new Adapter()});

it(`App is correctly rendered after relaunch`, () => {
  const properties = [
    {
      id: `prop-2`,
      city: `Amsterdam`,
      caption: `Wood and stone place`,
      imgSrc: `img/room.jpg`,
      type: `Private room`,
      priceCurrency: `€`,
      priceValue: 80,
      priceText: `night`,
      rating: 90,
    }
  ];

  const SortType = {
    POPULAR: `Popular`,
    PRICE_LOW_TO_HIGH: `Price: low to high`,
    PRICE_HIGH_TO_LOW: `Price: high to low`,
    TOP_RATED_FIRST: `Top rated first`
  };

  const clickHandler = jest.fn();
  const loadOffersHandler = jest.fn();
  const onSortArrowClick = jest.fn();
  const onSortOptionClick = jest.fn();
  const onPlaceCardMouseEnter = jest.fn();
  const onPlaceCardMouseLeave = jest.fn();
  const app = shallow(<Main
    city={properties[0].city}
    offers={properties}
    properties={properties}
    sortOptions={[SortType.POPULAR]}
    sortActiveOption={`Popular`}
    sortOpened={false}
    onSortArrowClick={onSortArrowClick}
    onSortOptionClick={onSortOptionClick}
    onPlaceCardMouseEnter={onPlaceCardMouseEnter}
    onPlaceCardMouseLeave={onPlaceCardMouseLeave}
    selectedCity={``}
    onClick={clickHandler}
    loadOffers={loadOffersHandler} />);
  const anchor = app.find(`PlacesList`).dive().find(`PlaceCard`).dive().find(`.place-card__name > a`);
  anchor.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
