import SortType from './consts/sort-type.js';
import MAX_RATING from './consts/max-rating.js';
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';

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

const convertRawUserData = (data) => {
  return Object.assign({}, data, {
    avatarUrl: data[`avatar_url`],
    isPro: data[`is_pro`],
  });
};

const convertRawOffersData = (data) => {
  data.forEach((el, i) => {
    data[i] = Object.assign({}, el, {
      previewImage: el[`preview_image`],
      isFavorite: el[`is_favorite`],
      isPremium: el[`is_premium`],
      host: convertRawUserData(el.host),
    });
  });
  return data;
};

const convertRawCommentData = (data) => {
  data.forEach((el, i) => {
    data[i] = Object.assign({}, el, {
      user: convertRawUserData(el.user),
    });
  });
  return data;
};

const convertRatingToPercent = (rating) => {
  return (rating * 100) / MAX_RATING;
};

const getYearMonth = (date) => {
  const dt = new Date(date);
  const month = dt.toLocaleDateString(`en`, {month: `long`});
  const year = dt.getFullYear();
  return `${month} ${year}`;
};

const getFullDate = (date) => {
  const dt = new Date(date);
  const year = dt.getFullYear();
  const month = `${(`00` + (dt.getMonth() + 1)).slice(-2)}`;
  const day = `${(`00` + dt.getDate()).slice(-2)}`;
  return `${year}-${month}-${day}`;
};

const getDistance = (coor1, coor2) => {
  const side1 = Math.abs(coor1.latitude - coor2.latitude);
  const side2 = Math.abs(coor1.longitude - coor2.longitude);
  return Math.sqrt(side1 * side1 + side2 * side2);
};

const getNearbyPlaces = (properties, current, top) => {
  const sorted = properties.slice().sort((p1, p2) =>
    getDistance(p1.location, current.location) - getDistance(p2.location, current.location));
  return sorted.slice(0, top);
};

const notifier = new Notyf();
const showError = (error, errType) => {
  if (errType) {
    notifier.error(errType + `. ${error.toString()}`);
  } else {
    notifier.error(error.toString());
  }
};

export {
  sortPropertiesByOption,
  getRand,
  getPropertiesByCity,
  convertRawOffersData,
  convertRawUserData,
  getPropertyById,
  convertRatingToPercent,
  getYearMonth,
  getFullDate,
  convertRawCommentData,
  getNearbyPlaces,
  showError,
};
