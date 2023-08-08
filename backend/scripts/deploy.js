const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const ERC721WithForcedRoyalties = await hre.ethers.getContractFactory("ERC721WithForcedRoyalties");
    const erc721Royalties = await ERC721WithForcedRoyalties.deploy();
    await erc721Royalties.deployed();

    console.log("ERC721WithForcedRoyalties deployed to:", erc721Royalties.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
