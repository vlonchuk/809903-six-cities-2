const offers = [
  {
    id: `prop-1`,
    city: `Amsterdam`,
    caption: `Beautiful & luxurious apartment at great location`,
    imgSrc: `img/apartment-01.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 120,
    priceText: `night`,
    rating: 50,
    coor: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
  },
  {
    id: `prop-2`,
    city: `Amsterdam`,
    caption: `Wood and stone place`,
    imgSrc: `img/room.jpg`,
    type: `Private room`,
    priceCurrency: `€`,
    priceValue: 80,
    priceText: `night`,
    rating: 80,
    coor: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
  },
  {
    id: `prop-3`,
    city: `Amsterdam`,
    caption: `Canal View Prinsengracht`,
    imgSrc: `img/apartment-02.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 132,
    priceText: `night`,
    rating: 100,
    coor: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
  },
  {
    id: `prop-4`,
    city: `Amsterdam`,
    caption: `Nice, cozy, warm big bed apartment`,
    imgSrc: `img/apartment-03.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 180,
    priceText: `night`,
    rating: 65,
    coor: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
  },
  {
    id: `prop-5`,
    city: `Paris`,
    caption: `Canal View Prinsengracht`,
    imgSrc: `img/apartment-02.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 132,
    priceText: `night`,
    rating: 90,
    coor: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
  },
  {
    id: `prop-6`,
    city: `Paris`,
    caption: `Nice, cozy, warm big bed apartment`,
    imgSrc: `img/apartment-03.jpg`,
    type: `Aparment`,
    priceCurrency: `€`,
    priceValue: 180,
    priceText: `night`,
    rating: 40,
    coor: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
  },
];

export const getPropertiesByCity = (city) => {
  return offers.filter((el) => el.city === city)
               .slice();
};

export default offers;
