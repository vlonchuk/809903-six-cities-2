const API_URL = `https://htmlacademy-react-2.appspot.com/six-cities`;

const ApiMethods = {
  CHECK_LOGIN: {
    method: `get`,
    url: `/login`,
  }
};

const Routes = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
};

const TIMEOUT = 5000;

export {
  API_URL,
  ApiMethods,
  Routes,
  TIMEOUT,
};
