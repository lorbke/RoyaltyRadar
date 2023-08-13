import React from 'react';
import { MetaMaskSDK } from '@metamask/sdk';
import './metamaskButton.css';


const MetaMaskButton = () => {
    const signMeta = async () => {
        const MMSDK = new MetaMaskSDK();
        const ethereum = MMSDK.getProvider();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAddress = accounts[0];
        console.log('MetaMask is installed!');
        console.log(ethereum);
        console.log('Selected Address:', selectedAddress);
    }

    const shortenAddress = (address) => {
      if (address) {
        const start = address.substring(0, 6);
        const end = address.substring(address.length - 4);
        return `${start}...${end}`;
      }
      return null;
    }

    return (
        <div className="metaMaskButtonContainer">
            <h2>Current Address: {shortenAddress(ethereum.selectedAddress)}</h2>
            <button className="metaMaskButton" onClick={signMeta}><span className='buttonLogoMeta'></span>Connect Wallet</button>
        </div>
    );
}

export default MetaMaskButton;