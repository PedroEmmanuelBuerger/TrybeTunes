import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      nameArstist: '',
      NameALbum: '',
      listAlbum: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musics = await getMusics(id);
    this.setState(({
      nameArstist: musics[0].artistName,
      NameALbum: musics[0].collectionName,
      listAlbum: musics.filter((element) => element.kind === 'song'),
    }));
  }

  render() {
    const { nameArstist, NameALbum, listAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{nameArstist}</h1>
        <h3 data-testid="album-name">{NameALbum}</h3>
        {listAlbum.map((element, index) => (<MusicCard
          music={ element }
          key={ index }
        />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default Album;
