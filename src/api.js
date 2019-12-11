import axios from 'axios';
import ActionCreator from './reducer/action-creator/action-creator.js';
import history from './history.js';

const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => {
    console.log(response);
    return response;
  };

  const onFail = (err) => {
    console.log(err);
    if (err.response.status === 401) {
      dispatch(ActionCreator.requireAuthorization(true));
      dispatch(ActionCreator.removeUser());
      history.push(`/login`);
    } else {
      history.push(`/`);
    }

    return err;
  };

  const onRequestSuccess = (config) => {
    console.log(config);
    return config;
  };

  api.interceptors.request.use(onSuccess);
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;
