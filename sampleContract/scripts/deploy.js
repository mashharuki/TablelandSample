const hre = require("hardhat");
const { Database, Validator, helpers } = require("@tableland/sdk");

async function main() {
  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();
  await lock.deployed();
  console.log(`Lock deployed to ${lock.address}`);

  // craete
  await lock.create({
    gasLimit: 30000000
  });
  // insert
  await lock.insert({
    gasLimit: 30000000
  });

  /*
  // signerオブジェクトを生成
  const [signer] = await hre.ethers.getSigners();
  const chainId = await signer.getChainId();
  // テーブル情報を取得
  const db = new Database({
    signer,
    baseUrl: helpers.getBaseUrl(chainId),
  });
  const validator = new Validator(db.config);
  const name = await validator.getTableById(tableId);
  const data = await db.prepare(`SELECT * from ${name}`).all();
  console.log(`Data in table '${name}':`);
  console.log(data);
  */
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
