import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from './../review-item/review-item.jsx';

const ReviewList = ({comments}) => {
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot;
      <span className="reviews__amount">{comments.length}</span>
    </h2>
    <ul className="reviews__list">
      {comments.map((el, i) => <ReviewItem review={el} key={i}/>)}
    </ul>
  </section>;
};

ReviewList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default ReviewList;
