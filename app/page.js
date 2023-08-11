"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.css';
import NavBar from './components/navbar';
import ArtistList from './components/artistList';
import MetaMaskButton from './components/metamaskButton';
import royaltyDistributorABI from '../data/RoyaltyDistributor.json';
const ethers = require('ethers');

const HomePage = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const contractAbi = royaltyDistributorABI;
  const contractAddress = "0x13127702Dc2b4Aac648b810B73F3CD56e0Fa3de4";

  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    } else {
      console.error("No crypto wallet found. Please install it.");
    }
  }, []);
  
  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(contractAddress, contractAbi, signer));
    }
  }, [provider]);

  return (
    <div>
      <NavBar contract={contract}/>
      <MetaMaskButton />
      <h1>Royalty Radar 📡 </h1>
      <ArtistList contract={contract} provider={provider}/>
    </div>
  );
};

export default HomePage;
