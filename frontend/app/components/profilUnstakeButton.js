"use client";
import React, { useEffect, useState } from 'react';
import './profilUnstakeButton.css';
import { ethers } from 'ethers';

const ProfilUnstakeButton = ({contract, provider}) => {
  const ethers = require('ethers');
  const [formattedResult, setEarnedRoyalties] = useState(null);

  console.log(contract);

  useEffect(() => {
    if (contract) {
      try {
        const result = contract.getEarnedRoyalties();
        const formattedResult = ethers.utils.formatEther(String(result));
        setEarnedRoyalties(formattedResult);
      } catch (error) {
        setEarnedRoyalties("0.0")
        console.error("Error fetching earned royalties:", error);
      }
    }
  });

  console.log(formattedResult);
  
  const callMyFunction = async () => {
    if (contract) {
      const result = await contract.withdrawRoyalties();
      console.log("Result:", result);
    }
  };

	return (
    <div className='profilUnstakeContainer'>
      <h2>Your Royalties: {formattedResult} ETH</h2>
		  <button className="profilUnstakeButton" onClick={callMyFunction}>Unstake!</button>
    </div>
	);
}

export default ProfilUnstakeButton;