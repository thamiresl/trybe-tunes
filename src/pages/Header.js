import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      user: user.name,
    });
  }

  render() {
    const {
      loading,
      user,
    } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : (
            <p data-testid="header-user-name">{user}</p>
          )
        }
      </header>
    );
  }
}
