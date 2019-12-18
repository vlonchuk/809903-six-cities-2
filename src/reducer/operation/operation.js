import ActionCreator from './../action-creator/action-creator.js';
import {
  convertRawOffersData,
  convertRawUserData,
  convertRawCommentData,
} from './../../utils.js';
import {Urls} from './../../consts/api.js';

const loadUser = (dispatch, data) => {
  const user = convertRawUserData(data);
  dispatch(ActionCreator.requireAuthorization(false));
  dispatch(ActionCreator.saveUser(user));
};

const Operation = {
  checkLogin: () => {
    return (dispatch, _, api) => {
      return api
        .get(Urls.LOGIN)
        .then((response) => {
          if (response.status === 200) {
            loadUser(dispatch, response.data);
          }
        })
        .catch(() => {});
    };
  },

  login: (email, password) => {
    return (dispatch, _, api) => {
      return api
        .post(Urls.LOGIN, {email, password})
        .then((response) => {
          if (response.status === 200) {
            loadUser(dispatch, response.data);
          }
        });
    };
  },

  loadOffers: () => {
    return (dispatch, _, api) => {
      return api
        .get(Urls.HOTELS)
        .then((response) => {
          let data = convertRawOffersData(response.data);
          dispatch(ActionCreator.loadOffers(data));
        });
    };
  },

  toggleFavorite: (favorites, hotelId, status) => {
    return (dispatch, _, _api) => {
      let hotel = favorites.find((el) => el.id === hotelId);
      if (hotel) {
        hotel.isFavorite = (status === 1);
        dispatch(ActionCreator.loadFavorites(favorites.slice()));
      }
    };
  },

  addToFavorite: (hotelId, status, favorites) => {
    return (dispatch, _, api) => {
      return api
        .post(`${Urls.FAVORITE}/${hotelId}/${status}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch(Operation.loadOffers());
            if (favorites) {
              dispatch(Operation.toggleFavorite(favorites, hotelId, status));
            }
          }
        });
    };
  },

  loadComments: (hotelId) => {
    return (dispatch, _, api) => {
      return api
        .get(`${Urls.COMMENTS}/${hotelId}`)
        .then((response) => {
          if (response.status === 200) {
            const data = convertRawCommentData(response.data);
            dispatch(ActionCreator.loadComments(data));
          }
        });
    };
  },

  addComment: (hotelId, rating, comment) => {
    return (dispatch, _, api) => {
      return api
        .post(`${Urls.COMMENTS}/${hotelId}`, {rating, comment})
        .then((response) => {
          if (response.status === 200) {
            dispatch(Operation.loadComments(hotelId));
          }
        });
    };
  },

  loadFavorites: () => {
    return (dispatch, _, api) => {
      return api
        .get(Urls.FAVORITE)
        .then((response) => {
          if (response.status === 200) {
            let data = convertRawOffersData(response.data);
            dispatch(ActionCreator.loadFavorites(data));
          }
        });
    };
  },
};

export default Operation;
