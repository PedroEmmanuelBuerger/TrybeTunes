import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List';

class CreateAlbumList extends Component {
  render() {
    const { artist, albuns } = this.props;
    const valor = `Resultado de álbuns de: ${artist}`;
    return (
      <div>
        <h1>
          {valor}
        </h1>
        {albuns[0].map((element, index) => <List obj={ element } key={ index } />)}
      </div>
    );
  }
}

CreateAlbumList.propTypes = {
  artist: PropTypes.string.isRequired,
  albuns: PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};
export default CreateAlbumList;
