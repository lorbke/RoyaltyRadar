import React from 'react';
import Link from 'next/link';
import artistsData from '../../data/artistData'; // Replace with your data source
import styles from './artistList.css';

const ArtistList = () => {
  return (
    <div className="container">
      <div className="artistGrid">
        {artistsData.map((artist) => (
          <Link key={artist.id} className="artistCard" href={`/artist/${artist.id}`}>
            <img src={artist.profilePic} alt={`${artist.name}'s Profile`} className="artistImage" />
            <div className="artistInfo">
              <h2 className="artistFont">{artist.name}</h2>
              <p className="artistFont">Price: {artist.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


{/* <Link className="buyButton" href={`/artist/${artist.id}`}>
Buy Now
</Link> */}

export default ArtistList;