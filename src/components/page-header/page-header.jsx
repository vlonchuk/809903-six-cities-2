import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Routes} from './../../consts/api.js';
import {Widths, Heights} from './../../consts/style.js';

const PageHeader = ({user}) => {
  const link = (user ? Routes.FAVORITES : Routes.LOGIN);
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to={Routes.MAIN} className="header__logo-link">
            <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width={Widths.HEADER_LOGO} height={Heights.HEADER_LOGO}></img>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link to={link} className="header__nav-link header__nav-link--profile" href="login">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{user ? user.email : `Sign in`}</span>
              </Link>
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
