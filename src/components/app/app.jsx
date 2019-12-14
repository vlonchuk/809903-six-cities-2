import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './../main/main.jsx';
import Login from './../login/login.jsx';
import Property from './../property/property.jsx';

const App = () => {
  return <section>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/offer/:id" exact component={Property} />
    </Switch>
  </section>;
};

export default App;
