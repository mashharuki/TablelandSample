import { Database } from "@tableland/sdk";
import * as dotenv from "dotenv";
import { Wallet, getDefaultProvider } from "ethers";
dotenv.config();

const {
      PRIVATE_KEY,
      YOUR_ALCHEMY_KEY
} = process.env;

// Signerオブジェクトを生成する。
const wallet = new Wallet(PRIVATE_KEY);
const provider = getDefaultProvider(`https://polygon-mumbai.g.alchemy.com/v2/${YOUR_ALCHEMY_KEY}`); 
const signer = wallet.connect(provider);

// Default to grabbing a wallet connection in a browser
const db = new Database({ signer });
// 更新するテーブル名を指定する。
var name = "my_sdk_table_80001_6473";

// Insert a row into the table
const { meta: insert } = await db
  .prepare(`INSERT INTO ${name} (id, val) VALUES (?, ?);`)
  .bind(3, "Bobby Tables!")
  .run();

// Wait for transaction finality
await insert.txn.wait();

// 2回目！
const { meta: insert2 } = await db
  .prepare(`INSERT INTO ${name} (id, val) VALUES (?, ?);`)
  .bind(4, "Bobby Tables!!")
  .run();

await insert2.txn.wait();

// Perform a read query, requesting all rows from the table
const { results } = await db.prepare(`SELECT * FROM ${name};`).all();

console.log(`query result: ${JSON.stringify(results)}`)