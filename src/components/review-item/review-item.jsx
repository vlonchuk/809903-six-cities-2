import React from 'react';
import PropTypes from 'prop-types';
import {
  convertRatingToPercent,
  getFullDate,
  getYearMonth,
} from './../../utils.js';
import {Widths, Heights} from './../../consts/style.js';

const ReviewItem = ({review}) => {
  const {user, rating, comment, date} = review;
  const ratingWidth = convertRatingToPercent(rating);
  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={Widths.REVIEW_AVATAR} height={Heights.REVIEW_AVATAR} alt="Reviews avatar"></img>
      </div>
      <span className="reviews__user-name">
        {user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: ratingWidth + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {comment}
      </p>
      <time className="reviews__time" dateTime={getFullDate(date)}>{getYearMonth(date)}</time>
    </div>
  </li>;
};

ReviewItem.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReviewItem;
