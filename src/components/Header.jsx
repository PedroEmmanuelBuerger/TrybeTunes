import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      alredy: false,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState(({ name: user.name, alredy: true }));
  }

  render() {
    const { name, alredy } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          { (alredy ? name : <Loading />)}
        </span>
        <section>
          <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
        </section>
      </header>
    );
  }
}

export default Header;
