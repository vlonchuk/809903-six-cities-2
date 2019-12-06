import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main';
import Map from './../map/map.jsx';

jest.mock(`./../map/map.jsx`, () => jest.fn().mockReturnValue(null));

it(`Main correctly renders after relaunch`, () => {
  const properties = [
    {
      id: 3,
      city: {
        name: `Amsterdam`,
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 8
        },
      },
      title: `Canal View Prinsengracht`,
      imgSrc: `img/apartment-02.jpg`,
      type: `Aparment`,
      priceCurrency: `€`,
      priceValue: 132,
      priceText: `night`,
      rating: 100,
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 12
      },
    },
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
      offers={properties} city={properties[0].city.name} properties={properties} loadOffers={loadOffersHandler}
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
