import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  state = {
    valor: false,
  };

  favorites = ({ target }) => {
    this.setState(({ valor: target.checked }));
  };

  render() {
    const { music, saveFavoritesMusics, list } = this.props;
    const { valor } = this.state;
    const bool = list.some((par) => par.trackId === music.trackId);
    return (
      <div>
        <h3>{ music.trackName }</h3>
        <audio controls="controls" data-testid="audio-component">
          <track kind="captions" />
          <source src={ music.previewUrl } type="audio/mp3" />
          seu navegador não suporta HTML5
        </audio>
        <label htmlFor={ music.trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ (e) => saveFavoritesMusics(e, music) }
            onClick={ this.favorites }
            checked={ bool || valor }
            id={ music.trackId }
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
  list: PropTypes.PropTypes.oneOfType([
    PropTypes.array,
  ]).isRequired,
};
export default MusicCard;
