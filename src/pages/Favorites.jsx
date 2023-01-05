import React, { Component } from 'react';
import Header from '../components/Header';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    loadings: false,
    list: [],
  };

  async componentDidMount() {
    const lists = await getFavoriteSongs();
    this.setState(() => ({
      loadings: true,
      list: lists,
    }));
    this.setState(() => ({
      loadings: false,
    }));
  }

  removeFavoritesMusics = async (e, music) => {
    this.setState(() => ({
      loadings: true,
    }));
    await removeSong(music);
    const lists = await getFavoriteSongs();
    this.setState(() => ({
      loadings: false,
      list: lists,
    }));
  };

  render() {
    const { loadings, list } = this.state;
    return (
      <div data-testid="page-favorites">
        {loadings && <Loading />}
        <Header />
        { list.map((element, index) => (
          <MusicCard
            saveFavoritesMusics={ this.removeFavoritesMusics }
            music={ element }
            key={ index }
            list={ list }
          />))}
      </div>
    );
  }
}
export default Favorites;
