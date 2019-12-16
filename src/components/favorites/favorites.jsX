import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import PageHeader from './../page-header/page-header.jsx';
import PlacesList from './../places-list/places-list.jsx';
import {Link} from "react-router-dom";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="page">
      <PageHeader user={this.props.user} />
      <footer className="footer">
        <Link to="/" className="footer__logo-link">
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
        </Link>
      </footer>
    </div>;
  }
}

Favorites.propTypes = {
  user: PropTypes.object,
  properties: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.user,
});

const FavoritesWrapped = connect(mapStateToProps)(Favorites);
export default FavoritesWrapped;
