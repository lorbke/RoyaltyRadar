// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RoyaltyDistributor {
    struct Artist {
        address addr;
        uint256 total_received;
        uint8 shares_for_sale;
        uint256 share_price;
    }

    Artist[] public artists;
    mapping (address => uint256) public artist_index;
    mapping (address => mapping (address => uint8)) public stakes;

    constructor() {
        Artist memory zero_artist = Artist(address(0), 0, 0, 0);
        artists.push(zero_artist);
    }

    function registerArtist(uint8 shares_for_sale, uint256 share_price) external {
        require(artist_index[msg.sender] == 0, "Artist already registered");
        artist_index[msg.sender] = artists.length;
        Artist memory temp_artist = Artist(msg.sender, 0, shares_for_sale, share_price);
        artists.push(temp_artist);
        stakes[msg.sender][msg.sender] = 100;
    }

    function giveRoyalties(address artist) external payable {
        require (artist_index[artist] > 0, "Artist must be registered");
        artists[artist_index[artist]].total_received += msg.value;
    }

    function buyRoyaltyRights(address artist) external payable {
        require (msg.value > 0, "Value must be greater than 0");
        require (artist_index[artist] > 0, "Artist must be registered");
        uint8 shares = (uint8)(msg.value / artists[artist_index[artist]].share_price);
        require (shares <= artists[artist_index[artist]].shares_for_sale, "Not enough shares available");
        stakes[artist][msg.sender] += shares;
        stakes[artist][artist] -= shares;
        artists[artist_index[artist]].shares_for_sale -= shares;
    }

    function getEarnedRoyalties() external view returns (uint256){
        // @todo fix this function
        uint256 total_stake = 0;
        for (uint i = 1; i < artists.length; i++) {
            address artist = artists[i].addr;
            uint256 caller_stake_percentage = stakes[artist][msg.sender];
            if (caller_stake_percentage > 0) {
                uint256 royalties_for_artist = (artists[i].total_received * caller_stake_percentage) / 100;
                total_stake += royalties_for_artist;
            }
        }
        return total_stake;
    }

    function withdrawRoyalties() external {
        // @todo rename variables to be more descriptive
        uint256 total_stake = 0;
        for (uint i = 1; i < artists.length; i++) {
            address artist = artists[i].addr;
            uint256 caller_stake_percentage = stakes[artist][msg.sender];
            if (caller_stake_percentage > 0) {
                uint256 royalties_for_artist = (artists[i].total_received * caller_stake_percentage) / 100;
                total_stake += royalties_for_artist;
                stakes[artist][msg.sender] = 0;
        }
        require(total_stake > 0, "No royalties to withdraw");
    }
        payable(msg.sender).transfer(total_stake);
    }
}