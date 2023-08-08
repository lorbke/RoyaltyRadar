// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// @todo check if correct royalty amount is transferred
contract ERC721WithForcedRoyalties is ERC721Enumerable {
    using SafeMath for uint256;

    mapping(uint256 => address) private _originalCreators;
    mapping(uint256 => uint8) private _royaltyPercentages;

    constructor() ERC721("ERC721WithForcedRoyalties", "ERFR") {}

    function mint(address recipient, uint8 royaltyPercentage) public {
        uint256 newTokenId = totalSupply().add(1); 
        _mint(recipient, newTokenId);
        _originalCreators[newTokenId] = msg.sender;
        _royaltyPercentages[newTokenId] = royaltyPercentage;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) {
        // Calculate royalty amount
        // uint256 saleValue = msg.value;
        // uint256 royaltyAmount = saleValue.mul(_royaltyPercentages[tokenId]).div(100);

		// transferRoyalty(tokenId);

        // // Transfer royalty to the original creator
        // payable(_originalCreators[tokenId]).transfer(royaltyAmount);

        // // Transfer remaining amount to the current owner
        // payable(from).transfer(saleValue.sub(royaltyAmount));

        // Call the original transferFrom functionality from ERC721
        // super.transferFrom(from, to, tokenId);
    }

	function newTransferFrom(address from, address to, uint256 tokenId) public payable {
        // Calculate royalty amount
        uint256 saleValue = msg.value;
        uint256 royaltyAmount = saleValue.mul(_royaltyPercentages[tokenId]).div(100);

        // Transfer royalty to the original creator
        payable(_originalCreators[tokenId]).transfer(royaltyAmount);

        // Transfer remaining amount to the current owner
        payable(from).transfer(saleValue.sub(royaltyAmount));

        // Call the original transferFrom functionality from ERC721
        super.transferFrom(from, to, tokenId);
	}

    function setRoyalty(uint256 tokenId, uint8 royaltyPercentage) public {
        require(_originalCreators[tokenId] == msg.sender, "Only the original creator can set the royalty");
        _royaltyPercentages[tokenId] = royaltyPercentage;
    }

    function royaltyOf(uint256 tokenId) public view returns (uint8) {
        return _royaltyPercentages[tokenId];
    }
}
