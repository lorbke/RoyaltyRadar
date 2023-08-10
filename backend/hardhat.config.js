require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  royaltyDistributor_address: "0x8E7fD2EAfB33dA6E673dAf465FD974189666C28B",
  networks: {
      hardhat: {},
      zoragoerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gasPrice: 5000000000
    }
  },
};
