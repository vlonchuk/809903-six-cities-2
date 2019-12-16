import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import Main from './../main/main.jsx';
import Login from './../login/login.jsx';
import Property from './../property/property.jsx';
import Favorites from './../favorites/favorites.jsx';

const App = (props) => {
  return <section>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/offer/:id" exact render={(offerProps) => {
        const newProps = props.getPropertyProps(props.offers, offerProps);
        props.loadPropertyParams(newProps.id, newProps.property);
        return <Property {...newProps} />;
      }} />
      <Route path="/favorites" exact component={Favorites} />
    </Switch>
  </section>;
};

App.propTypes = {
  offers: PropTypes.array.isRequired,
  getPropertyProps: PropTypes.func.isRequired,
  loadPropertyParams: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
});

const mapDispathToProps = (dispatch) => ({
  getPropertyProps: (offers, ownProps) => {
    return Property.getLinkProps(offers, ownProps);
  },

  loadPropertyParams: (id, property) => {
    Property.loadParams(dispatch, id, property);
  },
});

const AppWrapped = connect(mapStateToProps, mapDispathToProps)(App);
export default AppWrapped;
