import {
  TablelandNetworkConfig,
  baseURIs,
  proxies,
} from "@tableland/evm/network";
import { ethers, network, upgrades } from "hardhat";

/**
 * デプロイスクリプト
 */
async function main() {
  // Get the Tableland registry address for the current network
  const registryAddress =
    network.name === "localhost"
      ? proxies["local-tableland" as keyof TablelandNetworkConfig]
      : proxies[network.name as keyof TablelandNetworkConfig];
  // Get the baseURI with only the endpoint `/api/v1/` instead of an appended `/tables`
  let baseURI =
    network.name === "localhost"
      ? baseURIs["local-tableland" as keyof TablelandNetworkConfig]
      : baseURIs[network.name as keyof TablelandNetworkConfig];

  baseURI = baseURI.match(/^https?:\/\/[^\/]+\/[^\/]+\/[^\/]+\/?/)![0];

  if (!registryAddress)
    throw new Error("cannot get registry address for " + network.name);
  if (!baseURI) 
    throw new Error("cannot get base URI for " + network.name);

  // Deploy the Canvas contract.
  const CanvasGame = await ethers.getContractFactory("CanvasGame");
  
  /**
   * deployProxy メソッド
   */
  const canvasGame = await upgrades.deployProxy(
    CanvasGame,
    [baseURI, "not.implemented.com"],
    {
      kind: "uups",
    }
  );
  await canvasGame.waitForDeployment();

  // Check upgradeability.
  console.log("Proxy deployed to:", canvasGame.target, "on", network.name);

  // get impl address
  const impl = await upgrades.erc1967.getImplementationAddress(
    await canvasGame.getAddress()
  );
  console.log("^Add this to your 'hardhat.config.ts' file's 'deployments'");
  console.log("New implementation address:", impl);

  // Run post deploy table creation.
  console.log("\nRunning post deploy...");

  // Create our metadata table
  let tx = await canvasGame.createMetadataTable();
  let receipt = await tx.wait();
  
  // For fun—test minting and making a move.
  const accounts = await ethers.getSigners();
  // mint NFT
  tx = await canvasGame.connect(accounts[0]).safeMint(accounts[0].address);
  receipt = await tx.wait();

  console.log("receipt", receipt);

  // const [, transferEvent] = (await receipt.events) ?? [];
  // const tokenId = await transferEvent.args!.tokenId;
  // console.log("Token ID:", ethers.toNumber(tokenId));

  // Query all table values after mutating.
  // Note the `makeMove` method's SQL:
  // UPDATE canvas_{chainId}_{tokenId} SET x = ${x}, y = ${y} WHERE id = ${tokenId};
  // ethers.toNumber(tokenId)
  await canvasGame
    .connect(accounts[0])
    .makeMove(0, 10, 10); // (tokenId, x, y)
  await tx.wait();
  
  // Query all table values after mutating.
  const gateway = await canvasGame.metadataURI();
  console.log(`\nCheck out the mutated table data:`);
  console.log(gateway);
  // Get the specific token's URI.
  const tokenURI = await canvasGame.tokenURI(0);
  console.log(`And the specific token's URI:`);
  console.log(tokenURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});