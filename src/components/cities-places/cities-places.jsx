import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ActionCreator from './../../reducer/action-creator/action-creator.js';
import PlacesList from './../places-list/places-list.jsx';
import Map from './../map/map.jsx';
import PlacesFound from './../places-found/places-found.jsx';
import Sort from './../sort/sort.jsx';
import PlacesListType from './../../consts/places-list-type.js';

const CitiesPlaces = ({city, properties, sortOptions, sortActiveOption, sortOpened,
  onSortArrowClick, onSortOptionClick, onPlaceCardMouseEnter, onPlaceCardMouseLeave}) => {
  return <div className="cities__places-container container">
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <PlacesFound city={city} properties={properties}/>
      <Sort options={sortOptions} activeOption={sortActiveOption}
        opened={sortOpened} properties={properties}
        onArrowClick={onSortArrowClick}
        onOptionClick={onSortOptionClick}/>
      <PlacesList listType={PlacesListType.CITY} key="PlacesList" properties={properties}
        onPlaceCardMouseEnter={onPlaceCardMouseEnter}
        onPlaceCardMouseLeave={onPlaceCardMouseLeave}
      />
    </section>
    <div className="cities__right-section">
      {properties.length <= 0 ? null : <Map mapClass="cities__map" properties={properties}/>}
    </div>
  </div>;
};

CitiesPlaces.propTypes = {
  city: PropTypes.string.isRequired,
  properties: PropTypes.array.isRequired,
  onCityClick: PropTypes.func,
  onClick: PropTypes.func,
  sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortActiveOption: PropTypes.string.isRequired,
  sortOpened: PropTypes.bool.isRequired,
  onSortArrowClick: PropTypes.func.isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
  onPlaceCardMouseEnter: PropTypes.func.isRequired,
  onPlaceCardMouseLeave: PropTypes.func.isRequired,
};

const mapStateToProps = (_, ownProps) => ownProps;

const mapDispatchToProps = (dispatch) => ({
  onPlaceCardMouseEnter: (card) => {
    dispatch(ActionCreator.activateCard(card));
  },

  onPlaceCardMouseLeave: () => {
    dispatch(ActionCreator.activateCard(null));
  },
});


const CitiesPlacesWrapped = connect(mapStateToProps, mapDispatchToProps)(CitiesPlaces);
export {CitiesPlaces};
export default CitiesPlacesWrapped;
