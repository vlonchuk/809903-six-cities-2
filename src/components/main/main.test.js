import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main';
import Map from './../map/map.jsx';

jest.mock(`./../map/map.jsx`, () => jest.fn().mockReturnValue(null));

it(`Main correctly renders after relaunch`, () => {
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

  const tree = renderer
    .create(<Main
      offers={properties} city={properties[0].city} properties={properties} loadOffers={loadOffersHandler}
      sortOptions={[SortType.POPULAR]}
      sortActiveOption={SortType.POPULAR}
      sortOpened={false}
      onSortArrowClick={onSortArrowClick}
      onSortOptionClick={onSortOptionClick}
      onPlaceCardMouseEnter={onPlaceCardMouseEnter}
      onPlaceCardMouseLeave={onPlaceCardMouseLeave}
      selectedCity={``}
      onClick={clickHandler}
    />)
    .toJSON();

  expect(Map).toHaveBeenCalled();
  expect(tree).toMatchSnapshot();
});
