"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import artistsData from '../../data/artistData';
import './artistList.css';
import './artistModal.css'; 
import ArtistModal from './artistModal';

const ArtistList = (contract) => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  const openModal = (artist) => {
    setSelectedArtist(artist);
  };

  const closeModal = () => {
    setSelectedArtist(null);
  };

  const handleExchange = () => {
    // Handle the exchange action here
    console.log('Exchange clicked for', selectedArtist.name);
  };

  return (
    <div className="container">
      <div className="artistGrid">
        {artistsData.map((artist) => (
          <div
            key={artist.id}
            className="artistCard"
            onClick={() => openModal(artist)}
          >
            <img src={artist.profilePic} alt={`${artist.name}'s Profile`} className="artistImage" />
            <div className="artistInfo">
              <h2 className="artistFont">{artist.name}</h2>
              <p className="artistFont">Price: {artist.price}</p>
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
            contract={contract}
            provider={provider}
          />
        )}
      </Modal>
    </div>
  );
};

export default ArtistList;
