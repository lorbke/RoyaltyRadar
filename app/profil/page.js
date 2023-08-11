"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import NavBar from '../components/navbar';
import MetaMaskButton from '../components/metamaskButton';
import ProfilUnstakeButton from '../components/profilUnstakeButton';
// import royaltyDistributorABI from '../../data/RoyaltyDistributor.json';
const ethers = require('ethers');



const ProfilPage = ({ searchParams }) => {
  // const [provider, setProvider] = useState(null);
  // const [contract, setContract] = useState(null);
  const searchParams = useSearchParams();
  const contract = searchParams.get('contract');
  const [earnedRoyalties, setEarnedRoyalties] = useState(null); // New state for earned royalties
  // const contractAbi = royaltyDistributorABI;
  // const contractAddress = "0x8E7fD2EAfB33dA6E673dAf465FD974189666C28B";
  
  // useEffect(() => {
  //   if (window.ethereum) {
  //     setProvider(new ethers.providers.Web3Provider(window.ethereum));
  //   } else {
  //     console.error("No crypto wallet found. Please install it.");
  //   }
  // }, []);
  
  // useEffect(() => {
  //   if (provider) {
  //     const signer = provider.getSigner();
  //     setContract(new ethers.Contract(contractAddress, contractAbi, signer));
  //   }
  // }, [provider]);
  useEffect(() => {
    if (contract) {
      let result = contract.getEarnedRoyalties();
      result = ethers.utils.formatEther(String(result));
      setEarnedRoyalties(result); // Update the earnedRoyalties state
    }
  });

  return (
    <div>
	    <NavBar />
      <MetaMaskButton />
      <h1>Royalty Radar 📡 </h1>
      <h2>Your Royalties: {earnedRoyalties} ETH</h2>
      <ProfilUnstakeButton />
    </div>
  );
};

export default ProfilPage;