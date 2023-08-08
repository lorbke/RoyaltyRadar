"use client";
import React from 'react';
import { MetaMaskSDK } from '@metamask/sdk';

const MetaMaskButton = () => {
    const signMeta = () => {
        const MMSDK = new MetaMaskSDK();
        const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
        ethereum.request({ method: 'eth_requestAccounts', param: [] });
        console.log('MetaMask is installed!');
        console.log(ethereum);  
    }
    return (
        <button onClick={signMeta}>Connect Wallet</button>
    );
}  

export default MetaMaskButton;
