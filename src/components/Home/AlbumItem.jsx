import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import './AlbumItem.scss';

const AlbumItem = ({ album }) => {
  console.log(album);
  return (
    <div className="album-item-container">
      <img src={album.artworkUrl100} alt={album.collectionName} />
      <div>
        <p><strong>Artist:</strong> {album.artistName}</p>
        <p><strong>Album:</strong> {album.collectionName}</p>
        <p><strong>Release date:</strong> {moment(album.releaseDate).format('MM/DD/YYYY')}</p>
      </div>
    </div>
  );
};

AlbumItem.propTypes = { album: PropTypes.object.isRequired };

export default AlbumItem;
