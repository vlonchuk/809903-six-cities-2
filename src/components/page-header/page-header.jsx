import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({user}) => {
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <a className="header__logo-link" href="main.html">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="#">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{user ? user.email : `Sign in`}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  ;
};

PageHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired
  }),
};

export default PageHeader;