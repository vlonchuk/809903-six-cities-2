import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Operation from './../../reducer/operation/operation.js';
import PlaceCard from './../place-card/place-card.jsx';
import PlacesListType from './../../consts/places-list-type.js';
import {showError} from './../../utils.js';
import Errors from './../../consts/errors.js';

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
    switch (this.props.listType) {
      case PlacesListType.CITY:
        this._placesClass = `cities__places-list tabs__content places__list`;
        break;
      case PlacesListType.NEAR:
        this._placesClass = `near-places__list`;
        break;
      case PlacesListType.FAVORITES:
        this._placesClass = `favorites__places`;
        break;
      default:
        this._placesClass = ``;
    }
  }

  render() {
    return <div className={`${this._placesClass}`}>
      {this.properties}
    </div>;
  }

  get properties() {
    return this.props.properties.map((item) => (
      <PlaceCard listType={this.props.listType} key={item.id} data={item} onClick={this.props.onClick}
        onMouseEnter={this.props.onPlaceCardMouseEnter}
        onMouseLeave={this.props.onPlaceCardMouseLeave}
        onAddToFavorite={this.props.onAddToFavorite}
      />
    ));
  }
}

PlacesList.propTypes = {
  listType: PropTypes.oneOf(Object.values(PlacesListType)).isRequired,
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
  onPlaceCardMouseEnter: PropTypes.func,
  onPlaceCardMouseLeave: PropTypes.func,
  onAddToFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (_, ownProps) => ownProps;

const mapDispatchToProps = (dispatch) => ({
  onAddToFavorite: (hotelId, status, favorites) => {
    dispatch(Operation.addToFavorite(hotelId, status, favorites))
      .catch((err) => showError(err, Errors.ERR_ADD_FAVORITE));
  },
});

const PlacesListWrapped = connect(mapStateToProps, mapDispatchToProps)(PlacesList);
export {PlacesList};
export default PlacesListWrapped;
