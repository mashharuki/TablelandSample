# CanvasGame Hardhat Project(Tableland tutorial)

### 動かし方

- インストール

  ```bash
  yarn
  ```

- ローカルネットワークを起動

  ```bash
  npx hardhat node --network local-tableland
  ```

- デプロイ

  ```bash
  yarn deploy:mumbai
  ```

  実行結果

  ```bash
  Proxy deployed to: 0x9C6a56fBBef7EFD2b8dbC5F7DA8a261E00862d51 on maticmum
  ^Add this to your 'hardhat.config.ts' file's 'deployments'
  New implementation address: 0xEaC471E00787e7360E08C0b9a98BF0160302353e

  Check out the mutated table data:
  query?statement=SELECT%20*%20FROM%20_80001_7668
  And the specific token's URI:
  ✨  Done in 32.74s.
  ```

- 新たに座標を動かすコマンド

  ```bash
  yarn move:local
  ```

  実行結果

  ```bash
  Moving...

  Done! Refresh the metadata URL.
  ✨  Done in 1.81s.
  ```

  ```bash
  yarn move:mumbai
  ```

  実行結果

  ```bash
  Moving...

  Done! Refresh the metadata URL.
  ✨  Done in 6.94s.
  ```

- 検証するためのコマンド

  ```bash
  yarn verify:mumbai
  ```

  実行結果

  ```bash
  Verifying on 'maticmum'...
  Verifying implementation: 0xEaC471E00787e7360E08C0b9a98BF0160302353e
  Successfully submitted source code for contract
  contracts/CanvasGame.sol:CanvasGame at 0xEaC471E00787e7360E08C0b9a98BF0160302353e
  for verification on the block explorer. Waiting for verification result...

  Successfully verified contract CanvasGame on the block explorer.
  https://mumbai.polygonscan.com/address/0xEaC471E00787e7360E08C0b9a98BF0160302353e#code
  Verifying proxy: 0x9C6a56fBBef7EFD2b8dbC5F7DA8a261E00862d51
  Contract at 0x9C6a56fBBef7EFD2b8dbC5F7DA8a261E00862d51 already verified.
  Linking proxy 0x9C6a56fBBef7EFD2b8dbC5F7DA8a261E00862d51 with implementation
  Successfully linked proxy to implementation.

  Proxy fully verified.
  ✨  Done in 25.16s.
  ```

- 更新するためのコマンド

  ```bash
  yarn upgrade:mumbai
  ```

  実行結果

  ```bash
  Upgrading 'maticmum' proxy...
  Using proxy address '0x9C6a56fBBef7EFD2b8dbC5F7DA8a261E00862d51'
  Current implementation address: 0xEaC471E00787e7360E08C0b9a98BF0160302353e
  New implementation address: 0xEaC471E00787e7360E08C0b9a98BF0160302353e

  Proxy implementation did not change. Is this expected?
  ✨  Done in 8.49s.
  ```
