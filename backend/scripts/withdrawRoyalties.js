const { ethers } = require("hardhat");
const { royaltyDistributor_address } = require("../hardhat.config.js");

async function main() {
    // Assuming your contract is named "YourContractName" and you have it deployed at `deployedAddress`
    const deployedAddress = royaltyDistributor_address;
    const YourContract = await ethers.getContractFactory("RoyaltyDistributor");
    const contractInstance = YourContract.attach(deployedAddress);

    // If calling a view/read-only function:
    const result = await contractInstance.withdrawRoyalties(); 

    console.log("Transaction minted!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
