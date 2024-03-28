require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.3",
  // defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
