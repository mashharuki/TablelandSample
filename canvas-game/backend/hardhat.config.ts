import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@tableland/hardhat";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const {
  PRIVATE_KEY,
  MUMBAI_API_URL,
  POLYGONSCAN_API_KEY
} = process.env;

// proxy contract
export const deployments: { [key: string]: string } = {
  localhost: "0x998abeb3E57409262aE5b751f60747921B33613E", 
  maticmum: "0x9C6a56fBBef7EFD2b8dbC5F7DA8a261E00862d51", 
};

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
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY!
    }
  }
};

export default config;
