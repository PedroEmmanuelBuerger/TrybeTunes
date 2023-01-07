import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    loadings: false,
    info: [],
  };

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    this.setState(() => ({
      loadings: true,
    }));
    const informations = await getUser();
    this.setState(() => ({
      loadings: false,
      info: informations,
    }));
  };

  render() {
    const { loadings, info } = this.state;
    return (
      <div data-testid="page-profile">
        {loadings && <Loading />}
        <Header />
        <section>
          <div>
            <h1>Nome</h1>
            <p>{info.name}</p>
          </div>
          <div>
            <img data-testid="profile-image" src={ info.image } alt="foto" />
          </div>
          <div>
            <h2>Email</h2>
            <p>{info.email}</p>
          </div>
          <div>
            <h2>Descrição</h2>
            <p>{info.description}</p>
          </div>
          <div>
            <Link to="/profile/edit">
              <h3>Editar perfil</h3>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;
