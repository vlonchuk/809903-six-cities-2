import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CitiesList from './../cities-list/cities-list.jsx';
import {connect} from "react-redux";
import ActionCreator from './../../reducer/action-creator/action-creator.js';
import Operation from './../../reducer/operation/operation.js';
import CitiesPlaces from './../cities-places/cities-places.jsx';
import CitiesNoPlaces from './../cities-no-places/cities-no-places.jsx';
import {getRand} from './../../utils.js';
import PageHeader from './../page-header/page-header.jsx';
import {
  getPropertiesByCity,
  sortPropertiesByOption
} from './../../utils.js';

class Main extends PureComponent {
  render() {
    return this.renderMainPage();
  }

  renderMainPage() {
    const {
      offers,
      city,
      onCityClick,
      sortActiveOption,
      sortOptions,
      sortOpened,
      onSortArrowClick,
      onSortOptionClick,
      user
    } = this.props;
    const properties = this.props.getCityProperties(city, sortActiveOption, offers);
    const noPlaces = (city !== `` && properties && properties.length <= 0);
    const mainClassName = `page__main page__main--index` + (noPlaces ? ` page__main--index-empty` : ``);

    window.offers = offers;

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
              onSortOptionClick={onSortOptionClick} />
          }
        </div>
      </main>
    </div>;
  }

  selectRandomCity() {
    if (this.props.city === `` && this.props.offers.length > 0) {
      const cities = [...new Set(this.props.offers.map((el) => el.city.name))];
      const city = cities[getRand(cities.length)];
      this.props.onCityClick(city);
    }
  }

  componentDidMount() {
    this.selectRandomCity();
  }

  componentDidUpdate() {
    this.selectRandomCity();
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
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  })).isRequired,
  city: PropTypes.string.isRequired,
  getCityProperties: PropTypes.func,
  onCityClick: PropTypes.func,
  sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortActiveOption: PropTypes.string.isRequired,
  sortOpened: PropTypes.bool.isRequired,
  onSortArrowClick: PropTypes.func.isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
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
    isFavorite: PropTypes.bool.isRequired,
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
  sortOptions: state.sortOptions,
  sortActiveOption: state.sortActiveOption,
  sortOpened: state.sortOpened,
  activeCard: state.activeCard,
  isAuthorizationRequired: state.isAuthorizationRequired,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getCityProperties: (city, sortOption, offers) => {
    return sortPropertiesByOption(sortOption, getPropertiesByCity(city, offers));
  },

  onCityClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
  },

  onSortArrowClick: (opened) => {
    dispatch(ActionCreator.sortOpenToggle(opened));
  },

  onSortOptionClick: (option) => {
    dispatch(ActionCreator.sortOpenToggle(true));
    dispatch(ActionCreator.sortActiveOptionChange(option));
  },

  onLogin: (email, password) => {
    dispatch(Operation.login(email, password));
  },
});

const MainWrapped = connect(mapStateToProps, mapDispatchToProps)(Main);
export {Main};
export default MainWrapped;
