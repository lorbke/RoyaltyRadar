require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  royaltyDistributor_address: "0x151840029b5D9e4d0F472B4c7c952e93cCD74BdF",
  networks: {
      hardhat: {},
      zoragoerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gasPrice: 5000000000
    }
  },
};
