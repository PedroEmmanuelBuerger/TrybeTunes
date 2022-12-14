import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormsSearch extends Component {
  render() {
    const { isDisabled, Disabled, nameArtist, artist,
      searchArtist } = this.props;
    const number = 2;
    return (
      <div>
        <label htmlFor="search">
          <input
            id="artist"
            type="text"
            data-testid="search-artist-input"
            placeholder="artistas"
            onChange={ (e) => {
              Disabled(e, number);
              nameArtist(e);
            } }
            value={ artist }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isDisabled }
          onClick={ searchArtist }
        >
          Pesquisar
        </button>
      </div>

    );
  }
}

FormsSearch.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  Disabled: PropTypes.func.isRequired,
  nameArtist: PropTypes.func.isRequired,
  artist: PropTypes.string.isRequired,
  searchArtist: PropTypes.func.isRequired,
};

export default FormsSearch;
