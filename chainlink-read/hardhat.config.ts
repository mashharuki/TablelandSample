import "@nomicfoundation/hardhat-toolbox";
import "@tableland/hardhat";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

dotenv.config();

const {
  PRIVATE_KEY,
  MUMBAI_API_URL,
  POLYGONSCAN_API_KEY,
  ARBISCAN_API_KEY
} = process.env;


const config: HardhatUserConfig = {
  solidity: "0.8.19",
  localTableland: {
    silent: false,
    verbose: false,
  },
  networks: {
    maticmum: {
      url: MUMBAI_API_URL,
      accounts: [`${PRIVATE_KEY}`]
    },
    "arbitrum-goerli": {
      url: `https://goerli-rollup.arbitrum.io/rpc`,
      accounts: [`${PRIVATE_KEY}`]
    },
  },
  config: {
    args: {
      contractAddress: "0x383f1BAA132Cea7CFfb2780f2935deD0f8e7E654", // IMPORTANT: Update this with each deployment
      linkTokenAddress: "0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28", // Arbitrum Goerli LINK token
      oracleAddress: "0x2362A262148518Ce69600Cc5a6032aC8391233f5", // Translucent (node operator) address -- see: https://translucent.link/products/get-uint256)
      jobId: "7599d3c8f31e4ce78ad2b790cbcfc673", // Translucent job ID for single word uint256 request
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY!,
      arbitrumGoerli: ARBISCAN_API_KEY!,
    }
  },
};

interface ContractConfig {
  contractAddress: string;
  linkTokenAddress: string;
  oracleAddress: string;
  jobId: string;
}

interface ContractNetworkConfig {
  args: ContractConfig;
}

declare module "hardhat/types/config" {
  // eslint-disable-next-line no-unused-vars
  interface HardhatUserConfig {
    config: ContractNetworkConfig;
  }
}

declare module "hardhat/types/runtime" {
  // eslint-disable-next-line no-unused-vars
  interface HardhatRuntimeEnvironment {
    deployment: ContractConfig;
  }
}

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  // Get configs for user-selected network
  const config = hre.userConfig.config;
  hre.deployment = config.args;
});


export default config;
