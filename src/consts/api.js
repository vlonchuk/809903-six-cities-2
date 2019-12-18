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
  OFFER: `/offer/:id`,
  FAVORITES: `/favorites`,
  NOT_FOUND: `/not-found`,
};

const Urls = {
  LOGIN: `/login`,
  HOTELS: `/hotels`,
  FAVORITE: `/favorite`,
  COMMENTS: `/comments`,
};

const TIMEOUT = 5000;

export {
  API_URL,
  ApiMethods,
  Routes,
  TIMEOUT,
  Urls,
};
