import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ActionCreator from './../../reducer/action-creator/action-creator.js';
import Operation from './../../reducer/operation/operation.js';
import PlaceCard from './../place-card/place-card.jsx';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
    this._placesClass = this.props.forCity ? `cities__places-list tabs__content` : `near-places__list`;
    this._placeCardMouseEnterHandler = this.props.onPlaceCardMouseEnter || this.props.onPlaceCardMouseEnterDefault;
    this._placeCardMouseLeaveHandler = this.props.onPlaceCardMouseLeave || this.props.onPlaceCardMouseLeaveDefault;
  }

  render() {
    return <div className={`${this._placesClass} places__list`}>
      {this.properties}
    </div>;
  }

  get properties() {
    return this.props.properties.map((item) => (
      <PlaceCard forCity={this.props.forCity} key={item.id} data={item} onClick={this.props.onClick}
        onMouseEnter={this._placeCardMouseEnterHandler}
        onMouseLeave={this._placeCardMouseLeaveHandler}
        onAddToFavorite={this.props.onAddToFavorite}
      />
    ));
  }
}

PlacesList.propTypes = {
  forCity: PropTypes.bool.isRequired,
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
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  })).isRequired,
  onClick: PropTypes.func,
  onPlaceCardMouseEnterDefault: PropTypes.func.isRequired,
  onPlaceCardMouseLeaveDefault: PropTypes.func.isRequired,
  onPlaceCardMouseEnter: PropTypes.func,
  onPlaceCardMouseLeave: PropTypes.func,
  onAddToFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  onPlaceCardMouseEnterDefault: (card) => {
    dispatch(ActionCreator.activateCard(card));
  },

  onPlaceCardMouseLeaveDefault: () => {
    dispatch(ActionCreator.activateCard(null));
  },

  onAddToFavorite: (hotelId, status) => {
    dispatch(Operation.addToFavorite(hotelId, status));
  },
});

const PlacesListWrapped = connect(mapStateToProps, mapDispatchToProps)(PlacesList);

export {PlacesList};
export default PlacesListWrapped;
