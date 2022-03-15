import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      albumId: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    // o match é uma prop que contém o params, onde está o Id
    const music = await getMusics(id);
    const musicList = music.filter((_element, index) => index !== 0);

    this.setState({
      albumId: music[0],
      musicList,
    });
  }
  // o music está recebendo as informações do album e  das musicas
  // o albumId está reebendo só as informações do album

  render() {
    const {
      albumId,
      musicList,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ albumId.artistName }</p>
        <p data-testid="album-name">{ albumId.collectionName }</p>
        <MusicCard songs={ musicList } />
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
