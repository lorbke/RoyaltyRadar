"use client";
import React from 'react';
import NavBar from '../components/navbar';
import MetaMaskButton from '../components/metamaskButton';
import ProfilUnstakeButton from '../components/profilUnstakeButton';

const ProfilPage = () => {
  return (
    <div>
	    <NavBar />
      <MetaMaskButton />
      <h1>Royalty Radar 📡 </h1>
      <h2>Your Stake: </h2>
      <ProfilUnstakeButton />
    </div>
  );
};

export default ProfilPage;