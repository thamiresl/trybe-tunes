import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        Search
        <Header />
      </div>
    );
  }
}
