import React from 'React';
import PropTypes from 'prop-types';

const CitiesListItem = ({city, onCityClick}) => {
  return <li className="locations__item">
    <a className="locations__item-link tabs__item" href="#" onClick={() => onCityClick(city.id)}>
      <span>{city.name}</span>
    </a>
  </li>;
};

CitiesListItem.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onCityClick: PropTypes.func,
};

export default CitiesListItem;
