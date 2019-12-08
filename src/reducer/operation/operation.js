import ActionCreator from './../action-creator/action-creator.js';
import {convertRawOffersData, convertRawUserData} from './../../utils.js';

const Operation = {
  checkLogin: () => {
    return (dispatch, _getState, api) => {
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
    return (dispatch, _getState, api) => {
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
    return (dispatch, _getState, api) => {
      return api
        .get(`/hotels`)
        .then((response) => {
          let data = convertRawOffersData(response.data);
          dispatch(ActionCreator.loadOffers(data));
        });
    };
  },
};

export default Operation;
