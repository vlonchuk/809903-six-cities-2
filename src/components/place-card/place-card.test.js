import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card';

it(`Main correctly renders after relaunch`, () => {
  const item = {
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
  };

  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  const tree = renderer
    .create(<PlaceCard key={item.id} data={item} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
