const { ethers } = require("hardhat");
// import contract address from hardhat.config.js
const { royaltyDistributor_address } = require("../hardhat.config.js");

async function main() {
    // Assuming your contract is named "YourContractName" and you have it deployed at `deployedAddress`
    const deployedAddress = royaltyDistributor_address;
    const YourContract = await ethers.getContractFactory("RoyaltyDistributor");
    const contractInstance = YourContract.attach(deployedAddress);

    const tx = await contractInstance.registerArtist();
    await tx.wait();
    console.log("Transaction has been mined!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
