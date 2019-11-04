import React from 'react';
import Main from './../main/main.jsx';
import offers from './../../mocks/offers.js';

const App = () => {
  return <section>
    <Main properties={offers} />
  </section>;
};

export default App;
