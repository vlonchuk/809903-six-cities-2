import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from './../place-card/place-card.jsx';

class PlacesList extends Component {
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
      <PlaceCard key={item.id} data={item} onClick={this.props.onClick} onMouseOver={this.onPlaceCardMouseOver} />
    ));
  }

  onPlaceCardMouseOver(activeCard) {
    this.setState({activeCard});
  }

  shouldComponentUpdate() {
    return false;
  }
}

PlacesList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
  })).isRequired,
  onClick: PropTypes.func,
};

export default PlacesList;
