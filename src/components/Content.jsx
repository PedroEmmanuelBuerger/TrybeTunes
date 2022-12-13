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

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      nome: 'Name',
      Loadings: false,
      redirect: false,
    };
  }

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

  Disabled = (e) => {
    const valor = e.target.value;
    const numero = 3;
    if (valor.length >= numero) {
      this.setState(({
        isDisabled: false,
      }));
    } else {
      this.setState(({
        isDisabled: true,
      }));
    }
    this.setState(({
      nome: valor,
    }));
  };

  render() {
    const { isDisabled, nome, Loadings, redirect } = this.state;
    return (
      <main>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
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
            /> }
          </Route>
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
