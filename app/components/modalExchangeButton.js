import React, { useEffect, useState } from 'react';
import './artistModal.css';
import royaltyDistributorABI from '../../data/RoyaltyDistributor.json';
const ethers = require('ethers');

function ModalExchangeButton() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  // ABI of the contract you want to interact with
  const contractAbi = royaltyDistributorABI;
  const contractAddress = "0x8b55464F8e1ba6bD3aEd69683F80F104878b0bd4";
  console.log(contractAbi) // Replace with your contract's ABI
  console.log(process.env.CONTRACT_ADDRESS)

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

  const callMyFunction = async () => {
    if (contract) {
      const result = await contract.buyRoyaltyRights("0x18EeDAb07377871eFe7f2B31bFd86EebB8F5DeFF", 10); // Placeholder address of Artist
      console.log("Result:", result);
    }
  };

  return (
    <button className="modalExchangeButton" onClick={callMyFunction}>Exchange</button>
  );
}

export default ModalExchangeButton;