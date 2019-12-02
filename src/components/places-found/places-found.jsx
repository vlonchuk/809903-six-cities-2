import React from 'react';
import PropTypes from 'prop-types';

const PlacesFound = ({city, properties}) => {
  if (city === ``) {
    return <b className="places__found">Choose city</b>;
  }
  return <b className="places__found">{properties.length} places to stay in {city}</b>;
};

PlacesFound.propTypes = {
  city: PropTypes.string.isRequired,
  properties: PropTypes.array.isRequired,
};

export default PlacesFound;
