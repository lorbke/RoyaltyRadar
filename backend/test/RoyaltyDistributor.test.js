const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RoyaltyDistributor", () => {
    let RoyaltyDistributor, distributor;
    let owner, artist1, artist2, staker1, staker2;

    before(async () => {
        RoyaltyDistributor = await ethers.getContractFactory("RoyaltyDistributor");
        distributor = await RoyaltyDistributor.deploy();
        await distributor.deployed();

        [owner, artist1, artist2, staker1, staker2] = await ethers.getSigners();
    });

    it("should allow artists to register", async () => {
        await distributor.connect(artist1).registerArtist();
        const registeredArtist = await distributor.artists(0);
        expect(registeredArtist).to.equal(artist1.address);
    });

    it("should prevent double registration for artists", async () => {
        await expect(distributor.connect(artist1).registerArtist()).to.be.reverted;
    });

	it("should allow royalties to be given to the contract", async () => {
		const initialContractBalance = await ethers.provider.getBalance(distributor.address);
		await distributor.giveRoyalties(artist1.address, { value: ethers.utils.parseEther("1") });
		const newContractBalance = await ethers.provider.getBalance(distributor.address);
		expect(initialContractBalance).to.not.equal(newContractBalance);
	});	

    it("should allow royalty rights to be bought", async () => {
        await distributor.connect(staker1).buyRoyaltyRights(artist1.address, 10);
        const stake = await distributor.stakes(artist1.address, staker1.address);
        expect(stake).to.equal(10);
    });

    it("should allow stakers to withdraw their royalties", async () => {
		const initialStakerBalance = await ethers.provider.getBalance(staker1.address);
		await distributor.connect(staker1).withdrawRoyalties();
		const newStakerBalance = await ethers.provider.getBalance(staker1.address);
		expect(initialStakerBalance).to.not.equal(newStakerBalance);
    });

    // Add more tests as necessary.
});
