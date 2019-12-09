import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PageHeader from './../page-header/page-header.jsx';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this._mapEmail = React.createRef();
    this._mapPassword = React.createRef();
    this._onLogin = this.onLogin.bind(this);
  }

  onLogin(evt) {
    evt.preventDefault();
    if (!(this._mapEmail.current && this._mapPassword.current)) {
      return;
    }

    const email = this._mapEmail.current.value.trim();
    const password = this._mapPassword.current.value.trim();

    if (email === `` || password === ``) {
      return;
    }

    this.props.onLogin(email, password);
  }

  render() {
    return <div className="page page--gray page--login">
      <PageHeader user={this.props.user} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" ref={this._mapEmail} type="email" name="email" placeholder="Email" required=""></input>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={this._mapPassword} type="password" name="password" placeholder="Password" required=""></input>
              </div>
              <button className="login__submit form__submit button" type="submit" onClick={this._onLogin}>Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>;
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired
  }),
};

export default Login;
