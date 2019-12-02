import React from 'react';
import PropTypes from 'prop-types';
import CitiesListItem from '../cities-list-item/cities-list-item.jsx';

const CitiesList = ({onCityClick, selectedCity, offers, sortActiveOption}) => {
  const cities = [...new Set(offers.map((el) => el.city))];
  return <ul className="locations__list tabs__list">
    {cities.map((city) =>
      <CitiesListItem key={city} city={city} selected={city === selectedCity}
        onCityClick={onCityClick} sortActiveOption={sortActiveOption}/>
    )}
  </ul>;
};

CitiesList.propTypes = {
  onCityClick: PropTypes.func,
  selectedCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
  })).isRequired,
  sortActiveOption: PropTypes.string.isRequired,
};

export default CitiesList;
