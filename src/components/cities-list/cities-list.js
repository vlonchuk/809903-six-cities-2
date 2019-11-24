import React from 'React';
import PropTypes from 'prop-types';
import cities from './../../mocks/cities.js';
import CitiesListItem from './../cities-list-item/cities-list-item.js';

const CitiesList = () => {
  return <ul className="locations__list tabs__list">
    {cities.map((city) =>
      <CitiesListItem key={city.id} city={city}/>
    )}
  </ul>;
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default CitiesList;
