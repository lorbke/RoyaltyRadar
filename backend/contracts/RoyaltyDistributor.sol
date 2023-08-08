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
    address[] public artists;
    mapping (address => uint256) public artist_index;
    mapping (address => uint256) public total_received;
    mapping (address => mapping (address => uint256)) public stakes;

    function registerArtist() external {
        // @todo Ensure the artist is not already registered.
        require(artist_index[msg.sender] == 0, "Artist already registered");
        artists.push(msg.sender);
        artist_index[msg.sender] = artists.length;
    }

    function giveRoyalties(address artist) external payable {
        total_received[artist] += msg.value;
    }

    function buyRoyaltyRights(address artist, uint256 percentage) external {
        stakes[artist][msg.sender] += percentage;
    }

    function withdrawRoyalties() external {
        // @todo ensure that staker cannot withdraw multiple times
        uint256 total_stake = 0;
        for (uint256 i = 0; i < artists.length; i++) {
            total_stake += stakes[artists[i]][msg.sender];
        }
        payable(msg.sender).transfer(total_stake);
    }
}