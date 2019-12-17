import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {convertRatingToPercent} from './../../utils.js';
import PlacesListType from './../../consts/places-list-type.js';

const LARGE_WIDTH = 260;
const LARGE_HEIGHT = 200;
const SMALL_WIDTH = 150;
const SMALL_HEIGHT = 110;

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this._mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    this._addToFavoriteHandler = this.addToFavoriteHandler.bind(this);

    this._imgWidth = LARGE_WIDTH;
    this._imgHeight = LARGE_HEIGHT;

    switch (this.props.listType) {
      case PlacesListType.CITY:
        this._cardClass = `cities__place-card place-card`;
        this._wrapperClass = `cities__image-wrapper place-card__image-wrapper`;
        this._infoClass = `place-card__info`;
        break;
      case PlacesListType.NEAR:
        this._cardClass = `near-places__card place-card`;
        this._wrapperClass = `near-places__image-wrapper place-card__image-wrapper`;
        this._infoClass = `place-card__info`;
        break;
      case PlacesListType.FAVORITES:
        this._cardClass = `favorites__card place-card`;
        this._wrapperClass = `favorites__image-wrapper place-card__image-wrapper`;
        this._infoClass = `favorites__card-info place-card__info`;
        this._imgWidth = SMALL_WIDTH;
        this._imgHeight = SMALL_HEIGHT;
        break;
    }
  }

  mouseEnterHandler() {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(this.props.data);
    }
  }

  mouseLeaveHandler() {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  }

  addToFavoriteHandler() {
    this.props.onAddToFavorite(this.props.data.id, this.props.data.isFavorite ? 0 : 1, this.props.favorites);
  }

  render() {
    const bookmarkClass = `place-card__bookmark-button button` + (this.props.data.isFavorite ? ` place-card__bookmark-button--active` : ``);
    const ratingWidth = convertRatingToPercent(this.props.data.rating);

    return <article className={`${this._cardClass}`} id={this.props.data.id}
      onMouseEnter={this._mouseEnterHandler} onMouseLeave={this._mouseLeaveHandler}>
      {
        this.props.data.isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          :
          null
      }

      <div className={`${this._wrapperClass}`}>
        <Link to={`/offer/${this.props.data.id}`}>
          <img className="place-card__image" src={this.props.data.previewImage} width={this._imgWidth} height={this._imgHeight}
            alt="Place image"></img>
        </Link>
      </div>
      <div className={this._infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€`}{this.props.data.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkClass} type="button" onClick={this._addToFavoriteHandler}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidth + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <Link to={`/offer/${this.props.data.id}`}>
          <h2 className="place-card__name">
            {this.props.data.title}
          </h2>
        </Link>
        <p className="place-card__type">{this.props.data.type}</p>
      </div>
    </article>;
  }
}

PlaceCard.propTypes = {
  listType: PropTypes.oneOf(Object.values(PlacesListType)).isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
  }),
  favorites: PropTypes.array.isRequired,
  onAddToFavorite: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favorites: state.favorites,
});

const PlaceCardWrapped = connect(mapStateToProps)(PlaceCard);
export default PlaceCardWrapped;
