// Global variables
let contractAddress;
let contractABI;

// Load contract data from JSON
fetch('contractData.json')
    .then(response => response.json())
    .then(data => {
        contractAddress = '0x295b25B1975B8Cad6d7d48022cB6e777bB12a29e'; // zora-goerli
        contractABI = data.abi;
    });

async function requestAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
}


// document.getElementById('registerArtist').addEventListener('click', async () => {
//     const accounts = await web3.eth.getAccounts();
//     const mainAccount = accounts[0];

//     // Example: Calling a function named `myFunction` from your contract
//     try {
//         const result = await royaltyDistributor.methods.registerArtist(10, ethers.utils.parseEther("0.01")).send({ from: mainAccount });
//         console.log('Transaction successful:', result);
//     } catch (error) {
//         console.error('Error executing function:', error);
//     }
// });


document.getElementById('executeScript').addEventListener('click', async () => {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!');
        return;
    }

    const { ethers } = require('ethers');
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
        // Prompt user for account connections
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const signer = provider.getSigner();

        // You can put the ABI and contract address in a separate file and import them.
        // For simplicity, they are assumed to be available here.
        const myContract = new ethers.Contract(contractAddress, contractABI, signer);

        // Example: Calling a function named `myFunction` from your contract
        const tx = await myContract.myFunction();
        console.log('Transaction Hash:', tx.hash);

        // Waiting for it to be mined
        const receipt = await tx.wait();
        console.log('Transaction was mined in block:', receipt.blockNumber);
    } catch (error) {
        console.error('Error executing function:', error);
    }
});
