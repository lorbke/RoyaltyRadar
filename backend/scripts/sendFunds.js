const { ethers } = require("hardhat");
const { royaltyDistributor_address } = require("../hardhat.config.js");

async function main() {
    const [sender] = await ethers.getSigners();

    // Destination address and the amount to send (in this example, 1 Ether)
    const recipientAddress = royaltyDistributor_address; // Replace with the actual recipient address
    const amount = ethers.utils.parseEther("0.1");  // Sending 1 Ether

    console.log("Sending transaction from:", sender.address);
    console.log("Sending", ethers.utils.formatEther(amount), "ETH to", recipientAddress);

    const tx = await sender.sendTransaction({
        to: recipientAddress,
        value: amount
    });

    console.log("Transaction hash:", tx.hash);

    await tx.wait();  // Wait for the transaction to be mined

    console.log("Transaction has been mined!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error occurred:", error);
        process.exit(1);
    });
