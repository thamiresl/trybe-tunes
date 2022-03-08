import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchBtn: true,
    };
  }

  btnValidade = (event) => {
    const { value } = event.target;
    const inputSize = 2;
    this.setState(() => ({
      searchBtn: value.length < inputSize,
    }));
  }

  render() {
    const { searchBtn } = this.state;
    return (
      <div data-testid="page-search">
        <label htmlFor="search">
          Search
          <input
            data-testid="search-artist-input"
            id="search"
            type="text"
            name="search"
            onChange={ this.btnValidade }
          />
        </label>
        <button
          data-testid="search-artist-button"
          id="searchBtn"
          name="searchBtn"
          type="submit"
          disabled={ searchBtn }
        >
          Pesquisar
        </button>
        <Header />
      </div>
    );
  }
}
