import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore} from 'redux';
import reducer from './reducer/reducer.js';
import {Provider} from 'react-redux';

const init = () => {
  const store = createStore(reducer);
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
