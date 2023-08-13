"use client";
import React, { useState } from 'react';
import './artistModal.css'; // Import your custom CSS
import ModalExchangeButton from './modalExchangeButton';

const ArtistModal = ({ artist, onClose, onExchange, provider, contract }) => {
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
          <p>Price: {artist.price} ETH per %</p>
        </div>
      </div>
      <div className="modalTrade">
        <input
          className="modalRoyalty"
          placeholder="Enter royalty percentage"
          value={royaltyValue}
          onChange={handleRoyaltyChange}
        />
      </div>
      <div className="modalFooter">
        <ModalExchangeButton artist={artist} shares={royaltyValue} contract={contract} provider={provider}/>
      </div>
    </div>
  );
};

export default ArtistModal;