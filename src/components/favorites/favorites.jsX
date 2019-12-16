import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Operation from './../../reducer/operation/operation.js';
import PageHeader from './../page-header/page-header.jsx';
import PlacesList from './../places-list/places-list.jsx';
import {Link} from "react-router-dom";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    return <div className="page">
      <PageHeader user={this.props.user} />
      <div className="page__favorites-container container">
        {
          this.props.properties.length > 0 ?
            this.renderFull() :
            this.renderEmpty()
        }
      </div>
      {this.renderFooter()}
    </div>;
  }

  renderFull() {
    return <PlacesList forCity={true} key="PlacesList" properties={this.props.properties}/>;
  }

  renderEmpty() {
    return <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
      </div>
    </section>;
  }

  renderFooter() {
    return <footer className="footer">
      <Link to="/" className="footer__logo-link">
        <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
      </Link>
    </footer>;
  }
}

Favorites.propTypes = {
  user: PropTypes.object,
  properties: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.user,
  properties: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => {
    dispatch(Operation.loadFavorites());
  },
});

const FavoritesWrapped = connect(mapStateToProps, mapDispatchToProps)(Favorites);
export default FavoritesWrapped;
