import SortType from './consts/sort-type.js';
import MAX_RATING from './consts/max-rating.js';

const sortPropertiesByOption = (option, properties) => {
  if (option === SortType.PRICE_HIGH_TO_LOW) {
    return properties.slice().sort((p1, p2) => p2.price - p1.price);
  }
  if (option === SortType.PRICE_LOW_TO_HIGH) {
    return properties.slice().sort((p1, p2) => p1.price - p2.price);
  }
  if (option === SortType.TOP_RATED_FIRST) {
    return properties.slice().sort((p1, p2) => p2.rating - p1.rating);
  }
  return properties;
};

const getRand = (num) => {
  const size = 1.0 / num;
  return Math.floor(Math.random() / size);
};

const getPropertiesByCity = (city, offers) => {
  return offers.filter((el) => el.city.name === city)
               .slice();
};

const convertRawOffersData = (data) => {
  data.forEach((el, i) => {
    const prcntRating = (Math.round(el.rating) * 100) / MAX_RATING;
    data[i] = Object.assign({}, el, {
      previewImage: el[`preview_image`],
      isPremium: el[`is_premium`],
      rating: prcntRating,
    });
  });
  return data;
};

export {
  sortPropertiesByOption,
  getRand,
  getPropertiesByCity,
  convertRawOffersData,
};
