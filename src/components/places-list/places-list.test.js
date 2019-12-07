import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from './places-list';

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

  const onPlaceCardMouseEnter = jest.fn();
  const onPlaceCardMouseLeave = jest.fn();

  const tree = renderer
    .create(<PlacesList key="PlacesList" properties={properties}
      onPlaceCardMouseEnter={onPlaceCardMouseEnter}
      onPlaceCardMouseLeave={onPlaceCardMouseLeave}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
