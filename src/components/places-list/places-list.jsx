import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from './../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="cities__places-list places__list tabs__content">
      {this.properties}
    </div>;
  }

  get properties() {
    return this.props.properties.map((item) => (
      <PlaceCard key={item.id} data={item} onClick={this.props.onClick}
        onMouseEnter={this.props.onPlaceCardMouseEnter}
        onMouseLeave={this.props.onPlaceCardMouseLeave}
      />
    ));
  }
}

PlacesList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }),
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  })).isRequired,
  onClick: PropTypes.func,
  onPlaceCardMouseEnter: PropTypes.func.isRequired,
  onPlaceCardMouseLeave: PropTypes.func.isRequired,
};

export default PlacesList;
