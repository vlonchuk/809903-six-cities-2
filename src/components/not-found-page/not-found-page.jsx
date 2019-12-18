import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from './../page-header/page-header.jsx';

const NotFoundPage = () => {
  return <div className="page page--gray page--login">
    <PageHeader />
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <h3>404: NOT FOUND</h3>
      </div>
    </main>
  </div>;
};

NotFoundPage.propTypes = {
  user: PropTypes.object,
};

export default NotFoundPage;
