import React from 'react';
import './artistModal.css';
const ethers  = require('ethers');


function ModalExchangeButton({artist, shares, contract, provider}) {
  const callMyFunction = async () => {
    if (contract) {
      const price = ethers.utils.parseEther(String(shares * artist.price))
      console.log(contract);
      console.log(artist);
      console.log(shares);
      console.log(price);
      const result = await contract.buyRoyaltyRights("0x18EeDAb07377871eFe7f2B31bFd86EebB8F5DeFF", {value: price}); // Placeholder address of Artist
      console.log("Result:", result);
    }
  };

  return (
    <button className="modalExchangeButton" onClick={callMyFunction}>Exchange</button>
  );
}

export default ModalExchangeButton;