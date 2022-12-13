import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
