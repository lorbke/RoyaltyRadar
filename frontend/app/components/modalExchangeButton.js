import React, { useEffect, useState } from 'react';
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
      const result = await contract.buyRoyaltyRights("0x73D9146A7a8264327ad324e8E10976fda134E584", {value: price}); // Placeholder address of Artist
      console.log("Result:", result);
    }
  };

  return (
    <button className="modalExchangeButton" onClick={callMyFunction}>Exchange</button>
  );
}

export default ModalExchangeButton;