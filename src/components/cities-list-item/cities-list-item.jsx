import React from 'React';
import PropTypes from 'prop-types';

const CitiesListItem = ({city, selected, onCityClick}) => {
  const css = `locations__item-link tabs__item` + (selected ? ` tabs__item--active` : ``);
  return <li className="locations__item">
    <a className={css} href="#" onClick={() => onCityClick(city)}>
      <span>{city}</span>
    </a>
  </li>;
};

CitiesListItem.propTypes = {
  city: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onCityClick: PropTypes.func,
};

export default CitiesListItem;
