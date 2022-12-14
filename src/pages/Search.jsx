import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { isDisabled, Disabled } = this.props;
    const number = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search">
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="artistas"
            onChange={ (e) => Disabled(e, number) }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  Disabled: PropTypes.func.isRequired,
};

export default Search;
