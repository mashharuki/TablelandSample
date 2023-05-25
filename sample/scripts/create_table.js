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
// This is the table's `prefix`--a custom table value prefixed as part of the table's name
const prefix = "my_sdk_table";

// テーブルを作成
const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, val text);`)
  .run();

// The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
const { name } = create.txn; // e.g., my_sdk_table_80001_311

console.log(`create succuess: ${name}`);