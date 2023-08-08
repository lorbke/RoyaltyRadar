const hre = require("hardhat");

async function deployERC721WithForcedRoyalties() {
	const ERC721WithForcedRoyalties = await hre.ethers.getContractFactory("ERC721WithForcedRoyalties");
	const erc721Royalties = await ERC721WithForcedRoyalties.deploy();
	await erc721Royalties.deployed();
	return erc721Royalties;
}

async function deployRoyaltyDistributor() {
	const RoyaltyDistributor = await hre.ethers.getContractFactory("RoyaltyDistributor");
	const royaltyDistributor = await RoyaltyDistributor.deploy();
	await royaltyDistributor.deployed();
	return royaltyDistributor;
}

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

	const erc721Royalties = await deployERC721WithForcedRoyalties();
    console.log("ERC721WithForcedRoyalties deployed to:", erc721Royalties.address);

	const royaltyDistributor = await deployRoyaltyDistributor();
	console.log("RoyaltyDistributor deployed to:", royaltyDistributor.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
