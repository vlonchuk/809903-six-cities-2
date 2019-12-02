import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlacesList from './../places-list/places-list.jsx';
import Map from './../map/map.jsx';
import CitiesList from './../cities-list/cities-list.jsx';
import PlacesFound from './../places-found/places-found.jsx';
import Sort from './../sort/sort.jsx';
import {connect} from "react-redux";
import ActionCreator from './../../reducer/action-creator/action-creator.js';
import {SortType} from '../../sort-func.js';

class Main extends PureComponent {
  render() {
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList onCityClick={this.props.onCityClick} selectedCity={this.props.city}
              offers={this.props.offers} sortActiveOption={this.props.sortActiveOption}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <PlacesFound city={this.props.city} properties={this.props.properties}/>
              <Sort options={this.props.sortOptions} activeOption={this.props.sortActiveOption}
                opened={this.props.sortOpened} properties={this.props.properties}
                onArrowClick={this.props.onSortArrowClick}
                onOptionClick={this.props.onSortOptionClick}/>
              <PlacesList key="PlacesList" properties={this.props.properties} onClick={this.props.onClick}
                onPlaceCardMouseOver={this.props.onPlaceCardMouseOver}
                onPlaceCardMouseEnter={this.props.onPlaceCardMouseEnter}
                onPlaceCardMouseLeave={this.props.onPlaceCardMouseLeave}
              />
            </section>
            <div className="cities__right-section">
              <Map />
            </div>
          </div>
        </div>
      </main>
    </div>;
  }

  componentDidMount() {
    this.props.loadOffers();
  }
}

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    coor: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  })).isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    coor: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  })).isRequired,
  city: PropTypes.string.isRequired,
  loadOffers: PropTypes.func,
  onCityClick: PropTypes.func,
  onClick: PropTypes.func,
  onPlaceCardMouseOver: PropTypes.func,
  sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortActiveOption: PropTypes.string.isRequired,
  sortOpened: PropTypes.bool.isRequired,
  onSortArrowClick: PropTypes.func.isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
  onPlaceCardMouseEnter: PropTypes.func.isRequired,
  onPlaceCardMouseLeave: PropTypes.func.isRequired,
  activeCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    coor: PropTypes.shape({
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
  loadOffers: () => dispatch(ActionCreator.loadOffers()),

  onCityClick: (city, sortActiveOption) => {
    dispatch(ActionCreator.changeCity(city));
    const getPropertiesAction = ActionCreator.getProperties(city);
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
