import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music } = this.props;
    return (
      <div>
        <h3>{ music.trackName }</h3>
        <audio controls="controls" data-testid="audio-component">
          <track kind="captions" />
          <source src={ music.previewUrl } type="audio/mp3" />
          seu navegador não suporta HTML5
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
export default MusicCard;
