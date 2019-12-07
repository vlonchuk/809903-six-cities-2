import React from 'react';
import renderer from 'react-test-renderer';
import CitiesPlaces from './cities-places';
import SortType from './../../consts/sort-type.js';
import offers from './../../mocks/offers.js';

jest.mock(`./../map/map.jsx`, () => jest.fn().mockReturnValue(null));

it(`CitiesPlaces correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<CitiesPlaces
      offers={offers} city={offers[0].city.name} properties={offers} loadOffers={jest.fn()}
      sortOptions={[SortType.POPULAR]}
      sortActiveOption={SortType.POPULAR}
      sortOpened={false}
      onSortArrowClick={jest.fn()}
      onSortOptionClick={jest.fn()}
      onPlaceCardMouseEnter={jest.fn()}
      onPlaceCardMouseLeave={jest.fn()}
      selectedCity={``}
      onClick={jest.fn()}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
