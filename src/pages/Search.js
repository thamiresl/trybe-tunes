import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchBtn: true,
      artistName: '',
      loading: false,
      albums: [],
      searchArtist: '',
      resultArtist: false,
    };
  }

  searchClick = (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    this.setState({
      loading: true,
    },
    async () => {
      const albums = await searchAlbumsAPI(artistName);
      this.setState({
        loading: false,
        searchArtist: artistName,
        artistName: '',
        albums,
        resultArtist: true,
      });
    });
  }

  btnValidade = (event) => {
    const { value } = event.target;
    const inputSize = 2;
    this.setState(() => ({
      artistName: value,
      searchBtn: value.length < inputSize,
    }));
  }

  render() {
    const { searchBtn,
      searchArtist,
      artistName,
      resultArtist,
      loading,
      albums,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading /> : (
            <form>
              <label htmlFor="search">
                Search
                <input
                  data-testid="search-artist-input"
                  id="search"
                  type="text"
                  name="search"
                  value={ artistName }
                  onChange={ this.btnValidade }
                />
              </label>

              <button
                data-testid="search-artist-button"
                id="searchBtn"
                name="searchBtn"
                type="submit"
                disabled={ searchBtn }
                onClick={ this.searchClick }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        {searchArtist && (<p>{`Resultado de álbuns de: ${searchArtist}`}</p>)}
        {
          albums.length === 0 && resultArtist
            ? <p>Nenhum álbum foi encontrado</p>
            : albums.map((albuns) => (
              <div key={ albuns.collectionId }>
                <Link
                  data-testid={ `link-to-album-${albuns.collectionId}` }
                  to={ `/album/${albuns.collectionId}` }
                  key={ albuns.collectionId }
                >
                  Álbum
                </Link>
                <img
                  src={ albuns.artworkUrl100 }
                  alt={ `${albuns.collectionName}` }
                />
                <p>{albuns.collectionName}</p>
                <p>{albuns.artistName}</p>
              </div>))
        }
      </div>
    );
  }
}
