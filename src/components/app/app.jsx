import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import Main from './../main/main.jsx';
import Login from './../login/login.jsx';
import Property from './../property/property.jsx';
import Favorites from './../favorites/favorites.jsx';
import NotFoundPage from './../not-found-page/not-found-page.jsx';
import {Routes} from './../../consts/api.js';

const App = (props) => {
  if (props.offers.length <= 0) {
    return <section />;
  }

  return <section>
    <Switch>
      <Route path={Routes.MAIN} exact component={Main} />
      <Route path={Routes.LOGIN} exact component={Login} />
      <Route path={Routes.OFFER} exact render={(offerProps) => {
        const newProps = props.getPropertyProps(props.offers, offerProps);
        if (!newProps) {
          return <NotFoundPage/>;
        }
        props.loadPropertyParams(newProps.id, newProps.property);
        return <Property {...newProps} />;
      }} />
      <Route path={Routes.FAVORITES} exact component={Favorites} />
      <Route component={NotFoundPage} />
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
export {App};
export default AppWrapped;
