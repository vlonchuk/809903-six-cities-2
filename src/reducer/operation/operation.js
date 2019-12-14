import ActionCreator from './../action-creator/action-creator.js';
import {
  convertRawOffersData,
  convertRawUserData,
  convertRawCommentData,
} from './../../utils.js';

const Operation = {
  checkLogin: () => {
    return (dispatch, _, api) => {
      return api
        .get(`/login`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(ActionCreator.requireAuthorization(false));
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
            const user = convertRawUserData(response.data);
            dispatch(ActionCreator.requireAuthorization(false));
            dispatch(ActionCreator.saveUser(user));
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
};

export default Operation;
