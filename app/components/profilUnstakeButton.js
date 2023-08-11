import React, { useEffect, useState } from 'react';
// import royaltyDistributorABI from '../../data/RoyaltyDistributor.json';

// const ethers = require('ethers');

const ProfilUnstakeButton = (contract) => {
  // const [provider, setProvider] = useState(null);
  // const [contract, setContract] = useState(null);

  // ABI of the contract you want to interact with
  // const contractAbi = royaltyDistributorABI;
	// const contractAddress = "0x8E7fD2EAfB33dA6E673dAf465FD974189666C28B";
  // console.log(contractAbi) // Replace with your contract's ABI

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

  const callMyFunction = async () => {
    if (contract) {
      const result = await contract.withdrawRoyalties();
      console.log("Result:", result);
    }
  };
	return (
		<button onClick={callMyFunction}>Unstake!</button>
	);
}

export default ProfilUnstakeButton;