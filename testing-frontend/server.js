const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'node_modules/web3/dist')));
app.use('/static', express.static(path.join(__dirname, 'node_modules/ethers/dist')));

// Your smart contract details
const contractABI = require('./contractData.json');
const contractAddress = "0x13127702Dc2b4Aac648b810B73F3CD56e0Fa3de4";

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MetaMask Interaction</title>
            <script src="/static/web3.min.js"></script>
        </head>
        <body>
            <button id="connectMetamask">Connect to MetaMask</button>
			<br>
			<input type="text" id="param1" placeholder="Shares to be sold" />
			<input type="text" id="param2" placeholder="Share price" />
            <button id="registerArtist" disabled>Register Artist</button>
			<br>
			<input type="text" id="param3" placeholder="Artist address" />
			<input type="text" id="param4" placeholder="Royalty amount" />
			<button id="giveRoyalties">Simulate Trade</button>

            <script>
				const contractABI = ${JSON.stringify(contractABI)};
				const contractAddress = "${contractAddress}";

                let web3;
                let contract;
				let ethers;

                const connectMetamask = async () => {
                    if (typeof window.ethereum !== 'undefined') {
                        web3 = new Web3(window.ethereum);
                        contract = new web3.eth.Contract(contractABI, contractAddress);
                        
                        try {
                            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                            if (accounts.length) {
                                document.getElementById("registerArtist").disabled = false;
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

                const registerArtist = async () => {
					const param1Value = document.getElementById('param1').value;
					const param2Value = document.getElementById('param2').value;
                    const accounts = await web3.eth.getAccounts();
                    try {
                        const result = await contract.methods.registerArtist(param1Value, web3.utils.toWei(param2Value, "ether")).send({ from: accounts[0] });
                        alert('Function executed successfully: ' + JSON.stringify(result));
                    } catch (error) {
                        alert('Failed to execute function: ' + error);
                    }
                };
				
                const giveRoyalties = async () => {
					const param3Value = document.getElementById('param3').value;
					const param4Value = document.getElementById('param4').value;
                    const accounts = await web3.eth.getAccounts();
                    try {
                        const result = await contract.methods.giveRoyalties(param3Value).send({ from: accounts[0], value: web3.utils.toWei(param4Value, "ether") });
                        alert('Function executed successfully: ' + JSON.stringify(result));
                    } catch (error) {
                        alert('Failed to execute function: ' + error);
                    }
                };

                document.getElementById("connectMetamask").addEventListener("click", connectMetamask);
                document.getElementById("registerArtist").addEventListener("click", registerArtist);
                document.getElementById("giveRoyalties").addEventListener("click", giveRoyalties);
            </script>
        </body>
        </html>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
