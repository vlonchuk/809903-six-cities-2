import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CitiesList from './../cities-list/cities-list.jsx';
import {connect} from "react-redux";
import ActionCreator from './../../reducer/action-creator/action-creator.js';
import SortType from '../../consts/sort-type.js';
import CitiesPlaces from '../cities-places/cities-places.jsx';
import CitiesNoPlaces from '../cities-no-places/cities-no-places.jsx';
import {getRand} from './../../utils.js';
import Operation from './../../reducer/operation/operation.js';
import Login from './../login/login.jsx';
import PageHeader from './../page-header/page-header.jsx';
import Property from './../property/property.jsx';
import mockOffers from './../../mocks/offers.js';

class Main extends PureComponent {
  render() {
    return this.renderProperty();
    return this.props.isAuthorizationRequired ?
      this.renderLoginPage() :
      this.renderMainPage();
  }

  renderProperty() {
    console.log(this.props.offers);
    //return <Property id={1} user={this.props.user} offers={mockOffers}/>;
    if (this.props.offers && this.props.offers.length > 0) {
      return <Property id={1} user={this.props.user} offers={this.props.offers}/>;
    }
    return null;
  }

  renderLoginPage() {
    return <Login onLogin={this.props.onLogin} user={this.props.user}/>;
  }

  renderMainPage() {
    const {
      properties,
      offers,
      city,
      onCityClick,
      sortActiveOption,
      sortOptions,
      sortOpened,
      onSortArrowClick,
      onSortOptionClick,
      onClick,
      onPlaceCardMouseEnter,
      onPlaceCardMouseLeave,
      user
    } = this.props;
    const noPlaces = (city !== `` && properties.length <= 0);
    const mainClassName = `page__main page__main--index` + (noPlaces ? ` page__main--index-empty` : ``);

    return <div className="page page--gray page--main" key="app-main">
      <PageHeader user={user} />
      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList onCityClick={onCityClick} selectedCity={city}
              offers={offers} sortActiveOption={sortActiveOption}/>
          </section>
        </div>
        <div className="cities">
          { noPlaces ?
            <CitiesNoPlaces city={city} /> :
            <CitiesPlaces city={city}
              properties={properties}
              sortOptions={sortOptions}
              sortActiveOption={sortActiveOption}
              sortOpened={sortOpened}
              onSortArrowClick={onSortArrowClick}
              onSortOptionClick={onSortOptionClick}
              onClick={onClick}
              onPlaceCardMouseEnter={onPlaceCardMouseEnter}
              onPlaceCardMouseLeave={onPlaceCardMouseLeave} />
          }
        </div>
      </main>
    </div>;
  }

  componentDidMount() {
    this.props.loadOffers();
  }

  componentDidUpdate() {
    if (this.props.city === ``) {
      const cities = [...new Set(this.props.offers.map((el) => el.city.name))];
      const city = cities[getRand(cities.length)];
      this.props.onCityClick(city, SortType.POPULAR, this.props.offers);
    }
  }
}

Main.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }),
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }),
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  })).isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }),
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  })).isRequired,
  city: PropTypes.string.isRequired,
  loadOffers: PropTypes.func,
  onCityClick: PropTypes.func,
  onClick: PropTypes.func,
  sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortActiveOption: PropTypes.string.isRequired,
  sortOpened: PropTypes.bool.isRequired,
  onSortArrowClick: PropTypes.func.isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
  onPlaceCardMouseEnter: PropTypes.func.isRequired,
  onPlaceCardMouseLeave: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  activeCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }),
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  }),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
  city: state.city,
  properties: state.properties,
  sortOptions: state.sortOptions,
  sortActiveOption: state.sortActiveOption,
  sortOpened: state.sortOpened,
  activeCard: state.activeCard,
  isAuthorizationRequired: state.isAuthorizationRequired,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loadOffers: () => dispatch(Operation.loadOffers()),

  onCityClick: (city, sortActiveOption, offers) => {
    dispatch(ActionCreator.changeCity(city));
    const getPropertiesAction = ActionCreator.getProperties(city, offers);
    if (sortActiveOption === SortType.POPULAR) {
      dispatch(getPropertiesAction);
    } else {
      dispatch(ActionCreator.sortProperties(sortActiveOption, getPropertiesAction.payload));
    }
  },

  onSortArrowClick: (opened) => {
    dispatch(ActionCreator.sortOpenToggle(opened));
  },

  onSortOptionClick: (option, properties) => {
    dispatch(ActionCreator.sortOpenToggle(true));
    dispatch(ActionCreator.sortProperties(option, properties));
    dispatch(ActionCreator.sortActiveOptionChange(option));
  },

  onPlaceCardMouseEnter: (card) => {
    dispatch(ActionCreator.activateCard(card));
  },

  onPlaceCardMouseLeave: () => {
    dispatch(ActionCreator.activateCard(null));
  },

  onLogin: (email, password) => {
    dispatch(Operation.login(email, password));
  }
});

const MainWrapped = connect(mapStateToProps, mapDispatchToProps)(Main);

export {Main};

export default MainWrapped;
