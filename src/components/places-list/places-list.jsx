import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from './../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  render() {
    return <div className="cities__places-list places__list tabs__content">
      {this.properties}
    </div>;
  }

  get properties() {
    return this.props.properties.map((item) => (
      <PlaceCard key={item.id} {...item} onClick={this.props.onClick} />
    ));
  }
}

PlacesList.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  })).isRequired,
  onClick: PropTypes.func
};

export default PlacesList;
