# chainlink との連動させたパターン

### 動かし方

- インストール

  ```bash
  yarn
  ```

- アービトラムへのデプロイ

  ```bash
  yarn deploy:arbitrum-goerli
  ```

  実行結果

  ```bash
  Deploying TableState...
  Contract 'TableState' deployed to: 0xd65d3A6713e8dC13b1C7e3728D074a1aA4F810f9
  URL set to: 'https://testnets.tableland.network/query?unwrap=true&s=select%20%2A%20from%20healthbot_421613_1'
  Path set to: 'counter'
  Funding contract '0xd65d3A6713e8dC13b1C7e3728D074a1aA4F810f9' on network 'arbitrum-goerli'
  Contract 0xd65d3A6713e8dC13b1C7e3728D074a1aA4F810f9 funded with 3 LINK. Transaction Hash: 0xbaf44074334f31a00915ee304da0c74b978c0656bf9f92f90e5b520d7eece544

  Run the first two tasks to request and read table data:

  ---------------------------------

  Request new data at the URL + path:
  npx hardhat request-data --network arbitrum-goerli

  Read the data from the contract:
  npx hardhat read-data --network arbitrum-goerli

  ---------------------------------

  Fund the contract with 1 LINK:
  npx hardhat fund-link --network arbitrum-goerli

  Set the request URL:
  npx hardhat set-url --url <value> --network arbitrum-goerli

  Get the request URL:
  npx hardhat read-url --network arbitrum-goerli

  Set the request path:
  npx hardhat set-path --path <value> --network arbitrum-goerli

  Get the request path:
  npx hardhat read-path --network arbitrum-goerli

  Set the LINK default fee amount:
  npx hardhat set-fee --fee <value> --network arbitrum-goerli

  Set the LINK token address:
  npx hardhat set-link --address <value> --network arbitrum-goerli

  Withdraw LINK:
  npx hardhat withdraw --network arbitrum-goerli

  See all available tasks with:
  npx hardhat

  ---------------------------------

  Be sure to save contract address for 'TableState' in 'hardhat.config.ts':
  '0xd65d3A6713e8dC13b1C7e3728D074a1aA4F810f9'

  ✨  Done in 15.61s.
  ```
