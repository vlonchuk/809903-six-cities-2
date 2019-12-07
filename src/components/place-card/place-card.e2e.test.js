import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceCard from './place-card.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard is correctly rendered after relaunch`, () => {
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

  const mouseEnterHandler = jest.fn();
  const mouseLeaveHandler = jest.fn();

  const app = shallow(<PlaceCard key={item.id} data={item}
    onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />);

  const anchor = app.find(`article`);

  anchor.simulate(`mouseenter`);
  expect(mouseEnterHandler).toHaveBeenCalledWith(item);

  anchor.simulate(`mouseleave`);
  expect(mouseLeaveHandler).toHaveBeenCalledWith();
});
