import offers from './offers.js';

const cities = [
  {
    id: `city-2`,
    name: `Paris`,
  },
  {
    id: `city-3`,
    name: `Cologne`,
  },
  {
    id: `city-4`,
    name: `Brussels`,
  },
  {
    id: `city-1`,
    name: `Amsterdam`,
  },
  {
    id: `city-5`,
    name: `Hamburg`,
  },
  {
    id: `city-6`,
    name: `Dusseldorf`,
  },
];

export const getPropertiesByCityId = (cityId) => {
  return offers.filter((el) => el.cityId === cityId)
               .slice();
};

export default cities;
