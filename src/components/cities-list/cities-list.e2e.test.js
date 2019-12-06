import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CitiesList from './cities-list.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`CitiesList correctly functions after relaunch`, () => {
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

  const handler = jest.fn();
  const sortActiveOption = `Popular`;
  const app = shallow(<CitiesList selectedCity={offers[0].city.name} offers={offers} onCityClick={handler}
    sortActiveOption={sortActiveOption} />);
  const anchor = app.find(`CitiesListItem`).dive().find(`a`);
  anchor.simulate(`click`);
  expect(handler).toHaveBeenCalledWith(offers[0].city.name, sortActiveOption);
});
