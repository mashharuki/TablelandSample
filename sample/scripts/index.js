import { Database } from "@tableland/sdk";

// Our pre-defined health check table
const tableName = "my_sdk_table_80001_6473"; 

const db = new Database();

const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
console.log(results);