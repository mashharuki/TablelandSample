require("@nomicfoundation/hardhat-toolbox");
require("@tableland/hardhat");
require('dotenv').config;

const { 
  PRIVATE_KEY, 
  ALCHEMY_SEPOLIA_API_URL
} = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: ALCHEMY_SEPOLIA_API_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  localTableland: {
    silent: false,
    verbose: false,
  },
};
