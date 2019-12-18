import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import Operation from './../../reducer/operation/operation.js';
import PageHeader from './../page-header/page-header.jsx';
import PlacesList from './../places-list/places-list.jsx';
import PlacesListType from './../../consts/places-list-type.js';
import {showError} from './../../utils.js';
import Errors from './../../consts/errors.js';
import {Routes} from './../../consts/api.js';
import {Widths, Heights} from '../../consts/style.js';

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.loadFavorites()
        .catch((err) => showError(err, Errors.ERR_LOAD_FAVORITES));
    }
  }

  render() {
    if (!this.props.user) {
      return <Redirect to={Routes.LOGIN}/>;
    }

    this._cities = this.props.properties.reduce((cities, property) => {
      if (!cities.has(property.city.name)) {
        cities.set(property.city.name, [property]);
      } else {
        const arrayOfCities = cities.get(property.city.name);
        arrayOfCities.push(property);
      }
      return cities;
    }, new Map());

    return <div className="page">
      <PageHeader user={this.props.user} />
      <div className="page__favorites-container container">
        {
          this.props.properties.length > 0 ?
            this.renderFull() :
            this.renderEmpty()
        }
      </div>
      {this.renderFooter()}
    </div>;
  }

  renderFull() {

    return <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          Array.from(this._cities, ([key, value]) => <li className="favorites__locations-items" key={key}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{key}</span>
                </a>
              </div>
            </div>
            <PlacesList listType={PlacesListType.FAVORITES} key="PlacesList" properties={value}/>
          </li>)
        }
      </ul>
    </section>;
  }

  renderEmpty() {
    return <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
      </div>
    </section>;
  }

  renderFooter() {
    return <footer className="footer">
      <Link to="/" className="footer__logo-link">
        <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width={Widths.FAVORITES_LOGO} height={Heights.FAVORITES_LOGO}></img>
      </Link>
    </footer>;
  }
}

Favorites.propTypes = {
  user: PropTypes.object,
  properties: PropTypes.array.isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  window.offers = state.offers;
  return Object.assign({}, ownProps, {
    user: state.user,
    properties: state.favorites,
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => {
    return dispatch(Operation.loadFavorites());
  },
});

const FavoritesWrapped = connect(mapStateToProps, mapDispatchToProps)(Favorites);
export default FavoritesWrapped;
