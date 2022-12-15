import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music, saveFavoritesMusics } = this.props;
    return (
      <div>
        <h3>{ music.trackName }</h3>
        <audio controls="controls" data-testid="audio-component">
          <track kind="captions" />
          <source src={ music.previewUrl } type="audio/mp3" />
          seu navegador não suporta HTML5
        </audio>
        <label htmlFor="checkbox">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ (e) => saveFavoritesMusics(e, music) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  saveFavoritesMusics: PropTypes.func.isRequired,
};
export default MusicCard;