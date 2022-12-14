import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const { isDisabled, Disabled, nome, createUsers,
      Loadings, resetDisabled } = this.props;
    const number = 3;
    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            data-testid="login-name-input"
            onChange={ (e) => Disabled(e, number) }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ () => {
            createUsers({ name: nome });
            resetDisabled();
          } }
        >
          Entrar
        </button>
        {Loadings ? <Loading /> : ''}
      </div>
    );
  }
}

Login.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  Disabled: PropTypes.func.isRequired,
  nome: PropTypes.string.isRequired,
  createUsers: PropTypes.func.isRequired,
  Loadings: PropTypes.bool.isRequired,
  resetDisabled: PropTypes.func.isRequired,
};
export default Login;
