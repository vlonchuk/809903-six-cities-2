import React from 'react';
import PropTypes from 'prop-types';
import PlacesList from './../places-list/places-list.jsx';
import Map from './../map/map.jsx';
import PlacesFound from './../places-found/places-found.jsx';
import Sort from './../sort/sort.jsx';

const CitiesPlaces = ({city, properties, sortOptions, sortActiveOption, sortOpened, onSortArrowClick, onSortOptionClick, onClick, onPlaceCardMouseEnter, onPlaceCardMouseLeave}) => {
  return <div className="cities__places-container container">
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <PlacesFound city={city} properties={properties}/>
      <Sort options={sortOptions} activeOption={sortActiveOption}
        opened={sortOpened} properties={properties}
        onArrowClick={onSortArrowClick}
        onOptionClick={onSortOptionClick}/>
      <PlacesList key="PlacesList" properties={properties} onClick={onClick}
        onPlaceCardMouseEnter={onPlaceCardMouseEnter}
        onPlaceCardMouseLeave={onPlaceCardMouseLeave}
      />
    </section>
    <div className="cities__right-section">
      {properties.length <= 0 ? null : <Map />}
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

export default CitiesPlaces;
