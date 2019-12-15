import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {convertRatingToPercent} from './../../utils.js';

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._cardClass = this.props.forCity ? `cities__place-card` : `near-places__card`;
    this._wrapperClass = this.props.forCity ? `cities__image-wrapper` : `near-places__image-wrapper`;
    this._mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this._mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    this._addToFavoriteHandler = this.addToFavoriteHandler.bind(this);
  }

  mouseEnterHandler() {
    this.props.onMouseEnter(this.props.data);
  }

  mouseLeaveHandler() {
    this.props.onMouseLeave();
  }

  addToFavoriteHandler() {
    this.props.onAddToFavorite(this.props.data.id, this.props.data.isFavorite ? 0 : 1);
  }

  render() {
    const bookmarkClass = `place-card__bookmark-button button` + (this.props.data.isFavorite ? ` place-card__bookmark-button--active` : ``);
    const ratingWidth = convertRatingToPercent(this.props.data.rating);

    return <article className={`${this._cardClass} place-card`} id={this.props.data.id}
      onMouseEnter={this._mouseEnterHandler} onMouseLeave={this._mouseLeaveHandler}>
      {
        this.props.data.isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          :
          null
      }

      <div className={`${this._wrapperClass} place-card__image-wrapper`}>
        <img className="place-card__image" src={this.props.data.previewImage} width="260" height="200" alt="Place image"></img>
      </div>
      <div className="place-card__info">
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
  forCity: PropTypes.bool.isRequired,
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
  onAddToFavorite: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default PlaceCard;
