import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Login } exact />
        <Route path="/search" component={ Search } exact />
        <Route path="/album/:id" component={ Album } exact />
        <Route path="/favorites" component={ Favorites } exact />
        <Route path="/profile" component={ Profile } exact />
        <Route path="/profile/edit" component={ ProfileEdit } exact />
        <Route path="*" component={ NotFound } exact />
      </Switch>
    );
  }
}
