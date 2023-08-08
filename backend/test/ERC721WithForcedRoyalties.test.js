const { expect } = require("chai");

describe("ERC721WithForcedRoyalties", function() {

    let ERC721WithForcedRoyalties;
    let erc721;
    let owner;
    let buyer;
    let anotherAccount;

    beforeEach(async function() {
        ERC721WithForcedRoyalties = await ethers.getContractFactory("ERC721WithForcedRoyalties");
        [owner, buyer, anotherAccount] = await ethers.getSigners();
        erc721 = await ERC721WithForcedRoyalties.deploy();
        await erc721.deployed();
    });

    describe("Minting and transferring with royalties", function() {

        it("Should allow owner to mint an NFT", async function() {
            await erc721.mint(owner.address, 10);  // Assuming 10 is the royalty percentage
            expect(await erc721.ownerOf(1)).to.equal(owner.address);
        });

		it("Should not allow to transfer an NFT", async function() {
			await erc721.mint(owner.address, 10);
			await erc721.connect(owner).transferFrom(owner.address, buyer.address, 1);
			expect(await erc721.ownerOf(1)).to.equal(owner.address);
		});
			 

		it("Should allow to transfer an NFT", async function() {
			await erc721.mint(owner.address, 10);
			await erc721.connect(owner).newTransferFrom(owner.address, buyer.address, 1);
			expect(await erc721.ownerOf(1)).to.equal(buyer.address);
		});

        it("Should enforce royalties on transfer", async function() {
            await erc721.mint(owner.address, 10);
			transferValue = ethers.utils.parseEther("1.0");
			royaltyValue = erc721.
			console.log(await ethers.provider.getBalance(owner.address));
			const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
            
            await erc721.connect(owner).newTransferFrom(owner.address, buyer.address, 1, { value: transferValue });
			console.log(await ethers.provider.getBalance(owner.address));
            expect(await ethers.provider.getBalance(owner.address)).to.not.equal(ownerBalanceBefore);
            // ... Add more assertions based on your contract's logic
        });

        // Add more test cases as needed
    });
});
