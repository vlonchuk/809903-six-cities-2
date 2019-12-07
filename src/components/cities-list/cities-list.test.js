import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list';

it(`CitiesList correctly renders after relaunch`, () => {
  const offers = [
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

  const tree = renderer
    .create(<CitiesList selectedCity={offers[0].city.name} offers={offers} sortActiveOption={`Popular`}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
