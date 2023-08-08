import React from 'react';
import './artistModal.css'; // Import your custom CSS

const ArtistModal = ({ artist, onClose, onExchange }) => {
  return (
    <div className="modalContainer">
      <div className="modalHeader">
        <h2>{artist.name}</h2>
      </div>
      <div className="modalInfo">
        <img src={artist.profilePic} alt={`${artist.name}'s Profile`} className="modalArtistImage" />
        <div className="modalArtistInfo">
          <p>Price: {artist.price}</p>
        </div>
      </div>
      <div className="modalTrade">


      </div>
      <div className="modalFooter">
        <button className="modalExchangeButton" onClick={onExchange}>
          Exchange
        </button>
      </div>
    </div>
  );
};

export default ArtistModal;