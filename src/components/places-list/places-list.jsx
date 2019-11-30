import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from './../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this.onPlaceCardMouseOver = this.onPlaceCardMouseOver.bind(this);
  }

  render() {
    return <div className="cities__places-list places__list tabs__content">
      {this.properties}
    </div>;
  }

  get properties() {
    return this.props.properties.map((item) => (
      <PlaceCard key={item.id} data={item} onClick={this.props.onClick} onMouseOver={this.onPlaceCardMouseOver}
        onMouseEnter={this.props.onPlaceCardMouseEnter}
        onMouseLeave={this.props.onPlaceCardMouseLeave}
      />
    ));
  }

  onPlaceCardMouseOver(activeCard) {
    this.setState({activeCard});
  }
}

PlacesList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  })).isRequired,
  onClick: PropTypes.func,
  onPlaceCardMouseEnter: PropTypes.func.isRequired,
  onPlaceCardMouseLeave: PropTypes.func.isRequired,
};

export default PlacesList;
