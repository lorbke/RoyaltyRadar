import React, { useEffect, useState } from 'react';


const ProfilUnstakeButton = (contract) => {
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