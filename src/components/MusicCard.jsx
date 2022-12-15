import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favoritesMusics: [],
    };
  }

  render() {
    const { music, saveFavoritesMusics } = this.props;
    const { favoritesMusics } = this.state;
    const bool = favoritesMusics.some((element) => element.trackId === music.trackId);
    getFavoriteSongs().then((data) => {
      this.setState(() => ({
        favoritesMusics: data,
      }));
    });
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
            checked={ bool }
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
