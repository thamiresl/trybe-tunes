import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { songs } = this.props;
    return (
      <div>
        {
          songs.map((element) => (
            <div key={ element.trackName }>
              <p>{element.trackName}</p>
              <audio data-testid="audio-component" src={ element.previewUrl } controls>
                <track kind="captions" />
                o seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
            </div>
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.array,
}.isRequired;

export default MusicCard;
