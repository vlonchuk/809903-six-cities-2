import React from 'React';
import PropTypes from 'prop-types';
import CitiesListItem from './../cities-list-item/cities-list-item.js';

const CitiesList = ({cities, onCityClick}) => {
  return <ul className="locations__list tabs__list">
    {cities.map((city) =>
      <CitiesListItem key={city.id} city={city} onCityClick={onCityClick}/>
    )}
  </ul>;
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onCityClick: PropTypes.func
};

export default CitiesList;
