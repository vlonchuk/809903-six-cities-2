import {SortType} from './../../sort-func.js';

const initialState = {
  offers: [],
  city: ``,
  properties: [],
  sortOptions: [
    SortType.POPULAR,
    SortType.PRICE_LOW_TO_HIGH,
    SortType.PRICE_HIGH_TO_LOW,
    SortType.TOP_RATED_FIRST
  ],
  sortActiveOption: SortType.POPULAR,
  sortOpened: false,
  activeCard: null,
};

export default initialState;
