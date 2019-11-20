import {
  Button,
  Card,
  Input,
  Spin,
} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

import AlbumItem from './AlbumItem';

import './index.scss';

const Home = () => {
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);

  const handleChangeArtist = (event) => {
    const { value } = event.target;
    event.preventDefault();
    setArtist(value);
  };

  const handleClickSearch = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await axios.get(`${process.env.API_URL}?entity=album&attribute=artistTerm&term=${encodeURI(artist)}`);
    if (response.status === 200) {
      setAlbums(response.data.results.sort((a, b) => -1 * a.releaseDate.localeCompare(b.releaseDate)));
    } else {
      setAlbums([]);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <Card id="search-loading"><Spin /></Card>
    );
  }

  return (
    <>
      <Card id="search-card" className="box-shadow">
        <span>Artist:</span>
        <Input placeholder="Artist" onChange={handleChangeArtist} />
        <Button onClick={handleClickSearch}>Search</Button>
      </Card>
      <Card id="search-result-card" className="box-shadow">
        {albums.length > 0 ? albums.map(album =><AlbumItem album={album} />)
          : <p><strong>No albums to show</strong></p>}
      </Card>
    </>
  );
};

export default Home;
