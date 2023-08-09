// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

pragma solidity ^0.8.0;

// contract RoyaltyDistributor {
//     struct Pool {
//         uint256 total_received;
//     }

//     Pool[] public artist_pools;
//     mapping (address => uint256) public artist_pool_index;

//     function registerArtist() external {
//         // Ensure the artist is not already registered.
//         require(artist_pool_index[msg.sender] == 0, "Artist already registered");

//         artist_pools.push(Pool(0));  // Initialize total_received to 0
//         artist_pool_index[msg.sender] = artist_pools.length; // Index starts at 1, 0 is reserved for "not registered"
//     }

//     function getArtistPool(address artist) external view returns (Pool memory) {
//         uint256 index = artist_pool_index[artist];
//         require(index > 0, "Artist not registered");
//         return artist_pools[index - 1];
//     }

//     function giveRoyalties(address artist) external payable {
//         artist_pools[artist_pool_index[artist]].total_received += msg.value;
//     }

//     function buyRoyaltyRights(address artist, uint256 percentage) external {
//         // artist_pools[artist_pool_index[artist]].stakes[msg.sender] += percentage;
//     }

//     function withdrawRoyalties() external {
//         uint256 total_stake = 0;
//         // for (uint256 i = 1; i < artist_pools.length; i++) {
//         //     total_stake += artist_pools[i].stakes[msg.sender];
//         // }
//         // transfer to msg.sender
//         payable(msg.sender).transfer(total_stake);
//     }
// }

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
        stakes[msg.sender][msg.sender] = 100 - shares_for_sale;
    }

    function giveRoyalties(address artist) external payable {
        require (artist_index[artist] > 0, "Artist must be registered");
        artists[artist_index[artist]].total_received += msg.value;
    }

    function buyRoyaltyRights(address artist, uint8 percentage) external {
        // @todo ensure that percentage is actually available
        require (percentage > 0, "Percentage must be greater than 0");
        require (percentage <= 100, "Percentage must be less than or equal to 100");
        require (artist_index[artist] > 0, "Artist must be registered");
        stakes[artist][msg.sender] += percentage;
    }

    function withdrawRoyalties() external {
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