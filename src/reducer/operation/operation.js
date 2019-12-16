import ActionCreator from './../action-creator/action-creator.js';
import {
  convertRawOffersData,
  convertRawUserData,
  convertRawCommentData,
} from './../../utils.js';

const loadUser = (dispatch, data) => {
  const user = convertRawUserData(data);
  dispatch(ActionCreator.requireAuthorization(false));
  dispatch(ActionCreator.saveUser(user));
};

const Operation = {
  checkLogin: () => {
    return (dispatch, _, api) => {
      return api
        .get(`/login`)
        .then((response) => {
          if (response.status === 200) {
            loadUser(dispatch, response.data);
          }
        });
    };
  },

  login: (email, password) => {
    return (dispatch, _, api) => {
      return api
        .post(`/login`, {email, password})
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
        .get(`/hotels`)
        .then((response) => {
          let data = convertRawOffersData(response.data);
          dispatch(ActionCreator.loadOffers(data));
        });
    };
  },

  addToFavorite: (hotelId, status) => {
    return (dispatch, _, api) => {
      return api
        .post(`/favorite/${hotelId}/${status}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch(Operation.loadOffers());
          }
        });
    };
  },

  loadComments: (hotelId) => {
    return (dispatch, _, api) => {
      return api
        .get(`/comments/${hotelId}`)
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
        .post(`/comments/${hotelId}`, {rating, comment})
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
        .get(`/favorite`)
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
