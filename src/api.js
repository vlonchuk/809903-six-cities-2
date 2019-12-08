import axios from 'axios';
import ActionCreator from './reducer/action-creator/action-creator.js';

const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
      dispatch(ActionCreator.removeUser());
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default configureAPI;
