import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: [],
    };
  }

  async componentDidMount() {
    this.favoriteList();
  }

  favoriteSong = async (event) => {
    const { songs } = this.props;
    const songId = songs.find((som) => som.trackId === +event.target.value);
    this.setState((beforeState) => ({
      loading: true,
      checked: [...beforeState.checked, songId.trackId],
    }));
    await addSong(songId);
    this.setState({
      loading: false,
    });
  }

  favoriteList = async () => {
    const list = await getFavoriteSongs();
    const getId = list.map((id) => id.trackId);
    this.setState({
      checked: getId,
    });
  }

  render() {
    const { songs } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        { loading
          ? <Loading />
          : songs.map((element) => (
            <div key={ element.trackName }>
              <p>{element.trackName}</p>
              <audio data-testid="audio-component" src={ element.previewUrl } controls>
                <track kind="captions" />
                o seu navegador não suporta o elemento
                <code>audio</code>
              </audio>

              <label htmlFor="inputMusic">
                Favorita
                <input
                  data-testid={ `checkbox-music-${element.trackId}` }
                  type="checkbox"
                  name="inputMusic"
                  id="iputMusic"
                  value={ element.trackId }
                  onClick={ this.favoriteSong }
                  checked={ checked.some((id) => id === element.trackId) }
                />
              </label>
            </div>
          )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.array,
}.isRequired;

export default MusicCard;
