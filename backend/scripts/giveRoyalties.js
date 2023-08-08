const { ethers } = require("hardhat");
const { royaltyDistributor_address } = require("../hardhat.config.js");

async function main() {
    // Assuming your contract is named "YourContractName" and you have it deployed at `deployedAddress`
    const deployedAddress = royaltyDistributor_address;
    const YourContract = await ethers.getContractFactory("RoyaltyDistributor");
    const contractInstance = YourContract.attach(deployedAddress);
    const amount = ethers.utils.parseEther("0.05");  // Sending 1 Ether

    const tx = await contractInstance.giveRoyalties("0x18EeDAb07377871eFe7f2B31bFd86EebB8F5DeFF", {value: amount});
    await tx.wait();
    console.log("Transaction has been mined!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });