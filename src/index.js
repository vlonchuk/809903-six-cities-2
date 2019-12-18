import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer/reducer.js';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import configureAPI from './api.js';
import {Router} from 'react-router-dom';
import history from './history';
import Operation from './reducer/operation/operation.js';
import {showError} from './utils.js';
import Errors from './consts/errors.js';

const init = () => {
  const api = configureAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
  );

  store.dispatch(Operation.checkLogin());
  store.dispatch(Operation.loadOffers()).catch((err) => showError(err, Errors.ERR_LOAD_HOTELS));

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App store={store}/>
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
