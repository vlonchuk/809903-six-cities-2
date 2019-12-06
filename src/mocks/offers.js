import {getRand} from './../utils.js';

const offers = [
  {
    id: 1,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 8
      },
    },
    title: `Beautiful & luxurious apartment at great location`,
    imgSrc: `img/apartment-01.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 120,
    priceText: `night`,
    rating: 50,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 12
    },
  },
  {
    id: 2,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 8
      },
    },
    title: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
    rating: 80,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 12
    },
  },
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
  {
    id: 4,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 8
      },
    },
    title: `Nice, cozy, warm big bed apartment`,
    imgSrc: `img/apartment-03.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 180,
    priceText: `night`,
    rating: 65,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 12
    },
  },
  {
    id: 5,
    city: {
      name: `Paris`,
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
    rating: 90,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 12
    },
  },
  {
    id: 6,
    city: {
      name: `Paris`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 8
      },
    },
    title: `Nice, cozy, warm big bed apartment`,
    imgSrc: `img/apartment-03.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 180,
    priceText: `night`,
    rating: 40,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 12
    },
  },
];

export const getPropertiesByCity = (city) => {
  const show = getRand(2);
  if (!show) { // Для проверки CitiesNoPlaces
    return [];
  }

  return offers.filter((el) => el.city.name === city)
               .slice();
};

export default offers;
