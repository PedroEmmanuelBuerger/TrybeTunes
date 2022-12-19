import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';
import { createUser } from '../services/userAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      nome: 'Name',
      Loadings: false,
      redirect: false,
      artist: '',
      albuns: [],
      finishedSearch: false,
      artistSearch: '',
      list: [],
    };
  }

  createList = async () => {
    const lists = await getFavoriteSongs();
    this.setState(() => ({
      list: lists,
    }));
  };

  createUsers = async (par) => {
    this.setState(({
      Loadings: true,
    }));
    await createUser(par);
    this.setState(({
      Loadings: false,
      redirect: true,
    }));
  };

  Disabled = (e, numero) => {
    const { id } = e.target;
    const valor = e.target.value;
    if (valor.length >= numero) {
      this.setState(({
        isDisabled: false,
      }));
    } else {
      this.setState(({
        isDisabled: true,
      }));
    }
    if (id === 'artist') {
      return;
    }
    this.setState(({
      nome: valor,
    }));
  };

  resetDisabled = () => {
    this.setState(({
      isDisabled: true,
    }));
  };

  nameArtist = (e) => {
    const valor = e.target.value;
    this.setState(({
      artist: valor,
    }));
  };

  searchArtist = async () => {
    const { artist } = this.state;
    this.setState(({
      Loadings: true,
      finishedSearch: false,
    }));
    const album = await searchAlbumsAPI(artist);
    this.setState(({
      albuns: [album],
    }));
    this.setState(({
      Loadings: false,
      finishedSearch: true,
      artistSearch: artist,
      artist: '',
    }));
  };

  saveFavoritesMusics = async (e, music) => {
    const { list } = this.state;
    e.target.checked = true;
    const bool = list.some((par) => par.trackId === music.trackId);
    if (!bool) {
      this.setState(({
        Loadings: true,
      }));
      await addSong(music);
      this.setState(({
        Loadings: false,
      }));
    } else {
      this.setState(({
        Loadings: true,
      }));
      await removeSong(music);
      this.setState(({
        Loadings: false,
      }));
    }
  };

  render() {
    const { isDisabled, nome, Loadings, redirect,
      artist, finishedSearch, albuns, artistSearch, list } = this.state;
    this.createList();
    return (
      <main>
        <Switch>
          <Route
            path="/search"
            render={ (props) => (<Search
              { ...props }
              isDisabled={ isDisabled }
              Disabled={ this.Disabled }
              nameArtist={ this.nameArtist }
              artist={ artist }
              searchArtist={ this.searchArtist }
              Loadings={ Loadings }
              finishedSearch={ finishedSearch }
              albuns={ albuns }
              artistSearch={ artistSearch }
            />) }
          />
          <Route
            path="/album/:id"
            render={ (props) => (<Album
              { ...props }
              saveFavoritesMusics={ this.saveFavoritesMusics }
              Loadings={ Loadings }
              createList={ this.createList }
              list={ list }
            />) }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route
            exact
            path="/"
          >
            { redirect ? <Redirect to="/search" /> : <Login
              isDisabled={ isDisabled }
              Disabled={ this.Disabled }
              nome={ nome }
              createUsers={ this.createUsers }
              Loadings={ Loadings }
              resetDisabled={ this.resetDisabled }
            /> }
          </Route>
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
