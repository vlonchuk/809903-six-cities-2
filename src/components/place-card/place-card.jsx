import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._onMouseEnter = this.onMouseEnter.bind(this);
    this._onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.props.onMouseEnter(this.props.data);
  }

  onMouseLeave() {
    this.props.onMouseLeave();
  }

  render() {
    return <article className="cities__place-card place-card" id={this.props.data.id}
      onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave}>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={this.props.data.imgSrc} width="260" height="200" alt="Place image"></img>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{this.props.data.priceCurrency}{this.props.data.priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;{this.props.data.priceText}</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: this.props.data.rating + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#" onClick={this.props.onClick}>{this.props.data.caption}</a>
        </h2>
        <p className="place-card__type">{this.props.data.type}</p>
      </div>
    </article>;
  }
}

PlaceCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default PlaceCard;
