import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const { isDisabled, Disabled, nome, createUsers, Loadings } = this.props;
    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            data-testid="login-name-input"
            onChange={ Disabled }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ isDisabled }
          onClick={ () => createUsers({ name: nome }) }
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
};
export default Login;
