import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ReviewItem from './../review-item/review-item.jsx';
import ReviewAdd from './../review-add/review-add.jsx';

const ReviewList = ({hotelId, comments, isAuthorizationRequired}) => {
  return <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot;
      <span className="reviews__amount">{comments.length}</span>
    </h2>
    <ul className="reviews__list">
      {comments.map((el, i) => <ReviewItem review={el} key={i}/>)}
    </ul>
    {isAuthorizationRequired ? null : <ReviewAdd hotelId={hotelId}/>}
  </section>;
};

ReviewList.propTypes = {
  hotelId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: state.isAuthorizationRequired,
  comments: state.comments,
});

const ReviewListWrapped = connect(mapStateToProps)(ReviewList);

export default ReviewListWrapped;
