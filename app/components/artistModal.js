"use client";
import React, { useState } from 'react';
import './artistModal.css'; // Import your custom CSS
import ModalExchangeButton from './modalExchangeButton';

const ArtistModal = ({ artist, onClose, onExchange }) => {
  const [ethValue, setEthValue] = useState('');
  const [royaltyValue, setRoyaltyValue] = useState('');

  const handleEthChange = (e) => {
    setEthValue(e.target.value);
  };

  const handleRoyaltyChange = (e) => {
    setRoyaltyValue(e.target.value);
  };

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
        <input
          className="modalETH"
          placeholder="Enter ETH amount"
          value={ethValue}
          onChange={handleEthChange}
        />
        <input
          className="modalRoyalty"
          placeholder="Enter royalty percentage"
          value={royaltyValue}
          onChange={handleRoyaltyChange}
        />
      </div>
      <div className="modalFooter">
        <ModalExchangeButton />
        <button>hey</button>
      </div>
    </div>
  );
};

export default ArtistModal;