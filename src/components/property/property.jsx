import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import PageHeader from './../page-header/page-header.jsx';
import ActionCreator from './../../reducer/action-creator/action-creator.js';
import Operation from './../../reducer/operation/operation.js';
import {
  getPropertyById,
  convertRatingToPercent,
  getPropertiesByCity,
  getNearbyPlaces,
  showError,
} from './../../utils.js';
import {
  MAX_IMAGE_COUNT,
  MAX_NEARBY_PLACES,
} from '../../consts/constraints.js';
import ReviewList from './../review-list/review-list.jsx';
import Map from './../map/map.jsx';
import PlacesList from './../places-list/places-list.jsx';
import PlacesListType from './../../consts/places-list-type.js';
import Errors from './../../consts/errors.js';
import {Widths, Heights} from './../../consts/style.js';

class Property extends PureComponent {
  constructor(props) {
    super(props);
    this._handleAddToFavorite = this.handleAddToFavorite.bind(this);
  }

  handleAddToFavorite() {
    this.props.onAddToFavorite(this.props.property.id, this.props.property.isFavorite ? 0 : 1);
  }

  render() {
    return <div className="page">
      <PageHeader user={this.props.user}/>
      <main className="page__main page__main--property">
        <section className="property">
          {this.renderProperty()}
          <Map mapClass="property__map" properties={this.props.mapProperties}/>
          {this.renderNearbyProperties()}
        </section>
      </main>
    </div>;
  }

  renderNearbyProperties() {
    return <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <PlacesList listType={PlacesListType.NEAR} key="PlacesList" properties={this.props.properties} />
      </section>
    </div>;
  }

  renderProperty() {
    const {property} = this.props;
    const bookmarkClass = `property__bookmark-button button` + (property.isFavorite ? ` property__bookmark-button--active` : ``);
    const roundedRating = Math.round(property.rating);
    const ratingWidth = convertRatingToPercent(roundedRating);

    return <React.Fragment>
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {
            property.images.slice(0, MAX_IMAGE_COUNT).map((el, i) =>
              <div className="property__image-wrapper" key={i}>
                <img className="property__image" src={el} alt="Photo studio"></img>
              </div>
            )
          }
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {
            property.isPremium ?
              <div className="property__mark">
                <span>Premium</span>
              </div>
              : null
          }
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {property.title}
            </h1>
            <button className={bookmarkClass} type="button" onClick={this._handleAddToFavorite}>
              <svg className="property__bookmark-icon" width={Widths.PROPERTY_BOOKMARK_ICON} height={Heights.PROPERTY_BOOKMARK_ICON}>
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>

          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{width: ratingWidth + `%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{property.rating}</span>
          </div>

          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {property.type}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {property.bedrooms} Bedroom{property.bedrooms > 1 ? `s` : ``}
            </li>
            <li className="property__feature property__feature--adults">
              Max {property.maxAdults} adult{property.maxAdults > 1 ? `s` : ``}
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{property.price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>

          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {property.goods.map((el, i) =>
                <li className="property__inside-item" key={i}>
                  {el}
                </li>
              )}
            </ul>
          </div>
          {this.renderHost()}
          {this.renderComments()}
        </div>
      </div>
    </React.Fragment>;
  }

  renderHost() {
    const {property} = this.props;
    const avatarClass = `property__avatar-wrapper user__avatar-wrapper` + (property.host.isPro ? ` property__avatar-wrapper--pro` : ``);
    return <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={avatarClass}>
          <img className="property__avatar user__avatar" src={`/` + property.host.avatarUrl} width={Widths.PROPERTY_AVATAR} height={Heights.PROPERTY_AVATAR} alt="Host avatar"></img>
        </div>
        <span className="property__user-name">
          {property.host.name}
        </span>
        {property.host.isPro ?
          <span className="property__user-status">
            Pro
          </span>
          : null
        }
      </div>
      <div className="property__description">
        <p className="property__text">
          {property.description}
        </p>
      </div>
    </div>;
  }

  renderComments() {
    return <ReviewList hotelId={this.props.id}/>;
  }
}

Property.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.object,
  property: PropTypes.object,
  properties: PropTypes.array.isRequired,
  mapProperties: PropTypes.array.isRequired,
  onAddToFavorite: PropTypes.func,
};

const getNearbyProperties = (property, offers) => {
  const properties = getPropertiesByCity(property.city.name, offers);
  const propertiesExceptCurrent = properties.filter((el) => el.id !== property.id);
  return getNearbyPlaces(propertiesExceptCurrent, property, MAX_NEARBY_PLACES);
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.user,
});

const mapDispathToProps = (dispatch) => ({
  onAddToFavorite: (hotelId, status) => {
    dispatch(Operation.addToFavorite(hotelId, status));
  },
});

Property.getLinkProps = (offers, ownProps) => {
  const id = Number.parseInt(ownProps.match.params.id, 10);
  const property = getPropertyById(offers, id);

  if (!property) {
    return null;
  }

  const properties = getNearbyProperties(property, offers);
  const mapProperties = [property].concat(properties);

  return {
    id,
    property,
    properties,
    mapProperties,
  };
};

Property.loadParams = (dispatch, hotelId, property) => {
  dispatch(ActionCreator.activateCard(property));
  dispatch(Operation.loadComments(hotelId))
    .catch((err) => showError(err, Errors.ERR_LOAD_COMMENTS));
};

const PropertyWrapped = connect(mapStateToProps, mapDispathToProps)(Property);
export {Property};
export default PropertyWrapped;
