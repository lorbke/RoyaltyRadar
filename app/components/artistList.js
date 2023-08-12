"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import artistsData from '../../data/artistData';
import './artistList.css';
import './artistModal.css'; 
import ArtistModal from './artistModal';
import TradeGraph from './tradeGraph.js';

const ArtistList = ({contract, provider}) => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  const openModal = (artist) => {
    setSelectedArtist(artist);
  };

  const closeModal = () => {
    setSelectedArtist(null);
  };

  const handleExchange = () => {
    console.log('Exchange clicked for', selectedArtist.name);
  };

  return (
    <div className="container">
      <div className="artistGrid">
        {artistsData.map((artist) => (
          <div
            key={artist.id}
            className="artistCardWrapper"
            onClick={() => openModal(artist)}
          >
          <div className="artistCard">
            <img src={artist.profilePic} alt={`${artist.name}'s Profile`} className="artistImage" />
            <div className="artistInfo">
              <h2 className="artistFont">{artist.name}</h2>
              <p className="artistFont">Price: {artist.price}</p>
            </div>
            <TradeGraph data={artist.tradeData}/>
          </div>
        </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={selectedArtist !== null}
        onRequestClose={closeModal}
        contentLabel="Artist Modal"
        style={{
          overlay: {
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0)',
            border: '5px dashed black',
            borderRadius: '15px',
          },
        }}
      >
        {selectedArtist && (
          <ArtistModal
            artist={selectedArtist}
            onClose={closeModal}
            onExchange={handleExchange}
            provider={provider}
            contract={contract}
          />
        )}
      </Modal>
    </div>
  );
};

export default ArtistList;
