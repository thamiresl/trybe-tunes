import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btn: true,
      loading: false,
      loaded: false,
    };
  }

  // Verifica se existe no minimo 3 caracteres para habilitar o botão

  btnValidade = (event) => {
    const { value } = event.target;
    const inputSize = 3;
    this.setState(() => ({
      name: value,
      btn: value.length < inputSize,
    }));
  }

  // Verifica se ao clicar no botão a função createUser é chamada

  loginBtn = async () => {
    const { name } = this.state;
    this.setState(
      { loading: true },
      async () => {
        await createUser({ name });
        this.setState({
          loading: false,
          loaded: true,
        });
      },
    );
  }

  render() {
    const {
      btn,
      loaded,
      loading,
    } = this.state;

    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : (
            <form>
              <label htmlFor="name">
                Nome
                <input
                  data-testid="login-name-input"
                  id="name"
                  type="text"
                  name="name"
                  onChange={ this.btnValidade }
                />
              </label>
              <button
                type="submit"
                name="btn"
                data-testid="login-submit-button"
                disabled={ btn }
                onClick={ this.loginBtn }
              >
                Entrar
              </button>
            </form>
          )
        }
        { loaded && <Redirect to="/search" />}

      </div>
    );
  }
}
