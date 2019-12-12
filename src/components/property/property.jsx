import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import PageHeader from './../page-header/page-header.jsx';
import {
  getPropertyById,
  convertRatingToPercent
} from './../../utils.js';
import {MAX_IMAGE_COUNT} from './../../consts/index.js';

class Property extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="page">
      <PageHeader user={this.props.user}/>
      <main className="page__main page__main--property">
        <section className="property">
          {this.renderProperty()}
        </section>
      </main>
    </div>;
  }

  renderProperty() {
    const {property} = this.props;
    const bookmarkClass = `property__bookmark-button button` + (property.isFavorite ? ` property__bookmark-button--active` : ``);
    const ratingWidth = convertRatingToPercent(property.rating);

    return <div className="property__gallery-container container">
      <div className="property__gallery">
        {
          property.images.slice(0, MAX_IMAGE_COUNT).map((el, i) =>
            <div className="property__image-wrapper" key={i}>
              <img className="property__image" src={el} alt="Photo studio"></img>
            </div>
          )
        }
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
            <button className={bookmarkClass} type="button">
              <svg className="property__bookmark-icon" width="31" height="33">
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
        </div>
      </div>
    </div>;
  }

  renderHost() {
    const {property} = this.props;
    const avatarClass = `property__avatar-wrapper user__avatar-wrapper` + (property.host.isPro ? `property__avatar-wrapper--pro` : ``);
    return <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={avatarClass}>
          <img className="property__avatar user__avatar" src={`./` + property.host.avatarUrl} width="74" height="74" alt="Host avatar"></img>
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

}

Property.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.object,
  offers: PropTypes.array.isRequired,
  property: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
  user: state.user,
  property: getPropertyById(state.offers, ownProps.id),
});

const PropertyWrapped = connect(mapStateToProps)(Property);
export default PropertyWrapped;
