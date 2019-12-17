import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {MIN_COMMENT_LENGTH} from './../../consts/index.js';
import Operation from './../../reducer/operation/operation.js';

class ReviewAdd extends PureComponent {
  constructor(props) {
    super(props);

    this._mapForm = React.createRef();
    this._mapSubmit = React.createRef();
    this._onSubmit = this.onSubmit.bind(this);
    this._onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this._mapSubmit.current) {
      this._mapSubmit.current.disabled = true;
    }
  }

  onChange() {
    const form = this._mapForm.current;
    const submit = this._mapSubmit.current;
    if (!form || !submit) {
      return;
    }

    const rating = form.rating.value;
    const comment = form.review.value;

    const disabled = (rating === `` || comment.length < MIN_COMMENT_LENGTH);
    if (submit.disabled !== disabled) {
      submit.disabled = disabled;
    }
  }

  clearForm() {
    const form = this._mapForm.current;
    const submit = this._mapSubmit.current;
    if (!form || !submit) {
      return;
    }

    form.reset();
    submit.disabled = true;
  }

  async onSubmit(evt) {
    evt.preventDefault();
    const form = this._mapForm.current;
    if (!form) {
      return;
    }

    const rating = form.rating.value;
    const comment = form.review.value;
    await this.props.onAddComment(this.props.hotelId, rating, comment);
    this.clearForm();
  }

  render() {
    return <form className="reviews__form form" ref={this._mapForm} action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={this._onChange}>
        </input>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={this._onChange}>
        </input>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={this._onChange}>
        </input>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={this._onChange}>
        </input>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={this._onChange}>
        </input>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" onChange={this._onChange}
        placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" ref={this._mapSubmit} onClick={this._onSubmit}>Submit</button>
      </div>
    </form>;
  }
}

ReviewAdd.propTypes = {
  hotelId: PropTypes.number.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onAddComment: (hotelId, rating, comment) => {
    dispatch(Operation.addComment(hotelId, rating, comment));
  }
});

const ReviewAddWrapped = connect(null, mapDispatchToProps)(ReviewAdd);
export default ReviewAddWrapped;