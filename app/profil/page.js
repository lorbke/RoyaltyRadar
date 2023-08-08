"use client";
import React from 'react';
import NavBar from '../components/navbar';
import MetaMaskButton from '../components/metamaskButton';

const unStake = () => {
	console.log('unstake');
}

const ProfilPage = () => {
  return (
    <div>
	    <NavBar />
      <MetaMaskButton />
      <h1>Royalty Radar 📡 </h1>
      <button onClick={unStake}>Unstake!</button>
    </div>
  );
};

export default ProfilPage;