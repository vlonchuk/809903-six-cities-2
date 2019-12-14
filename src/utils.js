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

const getPropertyById = (offers, id) => {
  const properties = offers.filter((el) => el.id === id);
  return properties.length > 0 ? properties[0] : null;
};

const convertRawOffersData = (data) => {
  data.forEach((el, i) => {
    data[i] = Object.assign({}, el, {
      previewImage: el[`preview_image`],
      isFavorite: el[`is_favorite`],
      isPremium: el[`is_premium`],
      host: Object.assign({}, el.host, {
        isPro: el.host[`is_pro`],
        avatarUrl: el.host[`avatar_url`],
      }),
    });
  });
  return data;
};

const convertRatingToPercent = (rating) => {
  return (rating * 100) / MAX_RATING;
};

const convertRawUserData = (data) => {
  return Object.assign({}, data, {
    avatarUrl: data[`avatar_url`],
    isPro: data[`is_pro`],
  });
};

export {
  sortPropertiesByOption,
  getRand,
  getPropertiesByCity,
  convertRawOffersData,
  convertRawUserData,
  getPropertyById,
  convertRatingToPercent,
};
