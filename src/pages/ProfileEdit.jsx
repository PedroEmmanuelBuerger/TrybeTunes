import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    loadings: false,
    info: [],
    bool: true,
    nameBool: false,
    emailBool: false,
    descriptionBool: false,
    imageBool: false,
    name: '',
    email: '',
    description: '',
    image: '',
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
    const { name, email, description, image } = informations;
    this.setState(() => ({
      name,
      email,
      description,
      image,
    }));
  };

  attUser = async () => {
    const { email, name, description, image } = this.state;
    this.setState(() => ({
      loadings: true,
    }));
    await
    updateUser({ name, email, image, description });
    this.setState(() => ({
      loadings: false,
    }));
  };

  validationButtonName = ({ target }) => {
    const { nameBool } = this.state;
    const lint = nameBool;
    if (lint === nameBool) {
      const name = target.value;
      const bool = name.length > 0;
      this.setState(() => ({
        nameBool: bool,
      }));
    }
  };

  validationButtonEmail = ({ target }) => {
    const { emailBool } = this.state;
    const lint = emailBool;
    if (lint === emailBool) {
      const email = target.value;
      const emailVali = /\S+@\S+.\S+/;
      const bool = email.match(emailVali) !== null && email.length > 0;
      this.setState(() => ({
        emailBool: bool,
      }));
    }
  };

  validationButtonImage = ({ target }) => {
    const { imageBool } = this.state;
    const lint = imageBool;
    if (lint === imageBool) {
      const image = target.value;
      const bool = image.length > 0;
      this.setState(() => ({
        imageBool: bool,
      }));
    }
  };

  validationButtonDescr = ({ target }) => {
    const { descriptionBool } = this.state;
    const lint = descriptionBool;
    if (lint === descriptionBool) {
      const description = target.value;
      const bool = description.length > 0;
      this.setState(() => ({
        descriptionBool: bool,
      }));
    }
  };

  validationButton = () => {
    const { descriptionBool, emailBool, nameBool, imageBool } = this.state;
    const bools = (descriptionBool && emailBool && nameBool && imageBool);
    this.setState(() => ({
      bool: !bools,
    }));
  };

  saveInfos = ({ target }) => {
    const { id, value } = target;
    this.setState(() => ({
      [id]: value,
    }));
  };

  buttonFunc = async () => {
    const { history } = this.props;
    await this.attUser();
    history.push('/profile');
  };

  render() {
    const { loadings, info, bool, email, name,
      description, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {loadings && <Loading />}
        <Header />
        <form onSubmit={ (e) => e.preventDefault() }>
          <div>
            <p>Nome</p>
            <label htmlFor="name">
              <input
                id="name"
                type="text"
                data-testid="edit-input-name"
                onChange={ (e) => {
                  this.validationButton();
                  this.validationButtonName(e);
                  this.saveInfos(e);
                } }
                value={ name }
              />
            </label>
          </div>
          <div>
            <p>Email</p>
            <label htmlFor="Email">
              <input
                id="email"
                type="email"
                placeholder={ `${info.email}` }
                data-testid="edit-input-email"
                onChange={ (e) => {
                  this.validationButton();
                  this.validationButtonEmail(e);
                  this.saveInfos(e);
                } }
                value={ email }
              />
            </label>
          </div>
          <div>
            <p>Descrição</p>
            <label htmlFor="description">
              <input
                id="description"
                type="text"
                data-testid="edit-input-description"
                onChange={ (e) => {
                  this.validationButton();
                  this.validationButtonDescr(e);
                  this.saveInfos(e);
                } }
                value={ description }
              />
            </label>
          </div>
          <div>
            <p>Imagem</p>
            <label htmlFor="imagem">
              <input
                id="image"
                type="text"
                data-testid="edit-input-image"
                onChange={ (e) => {
                  this.validationButton();
                  this.validationButtonImage(e);
                  this.saveInfos(e);
                } }
                value={ image }
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              data-testid="edit-button-save"
              name="saveButton"
              disabled={ bool }
              onClick={ (e) => {
                this.buttonFunc(e);
              } }
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default ProfileEdit;
