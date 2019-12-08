import React from 'react';
import PropTypes from 'prop-types';
import CitiesListItem from '../cities-list-item/cities-list-item.jsx';

const CitiesList = ({onCityClick, selectedCity, offers, sortActiveOption}) => {
  const cities = [...new Set(offers.map((el) => el.city.name))];
  return <ul className="locations__list tabs__list">
    {cities.map((city) =>
      <CitiesListItem key={city} city={city} selected={city === selectedCity}
        onCityClick={onCityClick} sortActiveOption={sortActiveOption} offers={offers}/>
    )}
  </ul>;
};

CitiesList.propTypes = {
  onCityClick: PropTypes.func,
  selectedCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }),
  })).isRequired,
  sortActiveOption: PropTypes.string.isRequired,
};

export default CitiesList;
