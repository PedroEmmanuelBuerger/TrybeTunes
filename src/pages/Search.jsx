import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FormsSearch from '../components/FormsSearch';
import Loading from '../components/Loading';
import AlbumList from '../components/AlbumList';

class Search extends Component {
  render() {
    const { isDisabled, Disabled, nameArtist, artist,
      searchArtist, Loadings, finishedSearch, albuns, artistSearch } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        {!Loadings ? <FormsSearch
          isDisabled={ isDisabled }
          Disabled={ Disabled }
          nameArtist={ nameArtist }
          artist={ artist }
          searchArtist={ searchArtist }
        />
          : <Loading /> }
        {finishedSearch ? <AlbumList artist={ artistSearch } albuns={ albuns } /> : ''}
      </div>
    );
  }
}

Search.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  Disabled: PropTypes.func.isRequired,
  nameArtist: PropTypes.func.isRequired,
  artist: PropTypes.string.isRequired,
  searchArtist: PropTypes.func.isRequired,
  Loadings: PropTypes.bool.isRequired,
  finishedSearch: PropTypes.bool.isRequired,
  albuns: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
  artistSearch: PropTypes.string.isRequired,
};

export default Search;
