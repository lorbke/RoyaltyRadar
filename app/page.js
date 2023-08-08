import React from 'react';
import Link from 'next/link';
import styles from './page.css';
import NavBar from './components/navbar';
import ArtistList from './components/artistList';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <h1>Royalty Radar 📡 </h1>
      <ArtistList />
    </div>
  );
};

export default HomePage;
