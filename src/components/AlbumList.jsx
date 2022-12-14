import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateAlbumList from './CreateAlbumList';

class AlbumList extends Component {
  render() {
    const { artist, albuns } = this.props;
    return (
      <section>
        {albuns[0].length > 0
          ? <CreateAlbumList artist={ artist } albuns={ albuns } />
          : <p>Nenhum álbum foi encontrado</p> }

      </section>
    );
  }
}

AlbumList.propTypes = {
  artist: PropTypes.string.isRequired,
  albuns: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};

export default AlbumList;
