import axios from 'axios';
import ActionCreator from './reducer/action-creator/action-creator.js';
import history from './history.js';
import {
  API_URL,
  ApiMethods,
  Routes,
  TIMEOUT,
} from './consts/api.js';

const isCheckLogin = (method, url) => {
  return method.toLowerCase() === ApiMethods.CHECK_LOGIN.method &&
    url.toLowerCase() === (API_URL + ApiMethods.CHECK_LOGIN.url);
};

const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => {
    console.log(response);
    return response;
  };

  const onFail = (err) => {
    console.log(err);
    if (err.response.status === 401 && !isCheckLogin(err.config.method, err.config.url)) {
      console.log(err);
      dispatch(ActionCreator.requireAuthorization(true));
      dispatch(ActionCreator.removeUser());
      history.push(Routes.LOGIN);
    } else {
      history.push(Routes.MAIN);
    }

    return err;
  };

  api.interceptors.request.use(onSuccess);
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;
