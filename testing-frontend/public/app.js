const contractABI = require('../contractData.json');
const contractAddress = "0x13127702Dc2b4Aac648b810B73F3CD56e0Fa3de4";

let web3;
let contract;

const connectMetamask = async () => {
	if (typeof window.ethereum !== 'undefined') {
		web3 = new Web3(window.ethereum);
		contract = new web3.eth.Contract(contractABI, contractAddress);
		
		try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			if (accounts.length) {
				document.getElementById("executeFunction").disabled = false;
				alert('Connected: ' + accounts[0]);
			} else {
				alert('Failed to connect');
			}
		} catch (error) {
			alert('User denied account access');
		}
	} else {
		alert('MetaMask not detected');
	}
};

const executeFunction = async () => {
	const accounts = await web3.eth.getAccounts();
	try {
		const result = await contract.methods.registerArtist(1, 100000).send({ from: accounts[0] });
		alert('Function executed successfully: ' + JSON.stringify(result));
	} catch (error) {
		alert('Failed to execute function: ' + error);
	}
};