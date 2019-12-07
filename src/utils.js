import SortType from './consts/sort-type.js';

const sortPropertiesByOption = (option, properties) => {
  if (option === SortType.PRICE_HIGH_TO_LOW) {
    return properties.slice().sort((p1, p2) => p2.priceValue - p1.priceValue);
  }
  if (option === SortType.PRICE_LOW_TO_HIGH) {
    return properties.slice().sort((p1, p2) => p1.priceValue - p2.priceValue);
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

export {
  sortPropertiesByOption,
  getRand
};
