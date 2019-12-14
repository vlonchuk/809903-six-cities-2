import React from 'react';
import PropTypes from 'prop-types';

const ReviewList = ({reviews}) => {
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot;
      <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
    </ul>
  </section>;
};

ReviewList.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default ReviewList;
