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

class Main extends PureComponent {
  render() {
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
    } = this.props;
    const noPlaces = (city !== `` && properties.length <= 0);
    const mainClassName = `page__main page__main--index` + (noPlaces ? ` page__main--index-empty` : ``);

    return <div className="page page--gray page--main" key="app-main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
});

const MainWrapped = connect(mapStateToProps, mapDispatchToProps)(Main);

export {Main};

export default MainWrapped;
