import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './../main/main.jsx';
import Login from './../login/login.jsx';

const App = () => {
  return <section>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </section>;
};

export default App;
