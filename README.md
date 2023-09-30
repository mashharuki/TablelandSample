# TablelandSample

Tableland を学習するためのリポジトリです。

### SDK のインストール

```bash
npm install --save @tableland/sdk
```

### テーブルにつける名前のフォーマット

```txt
{prefix}_{chainId}_{tableId}.
```

### クエリで実際に取得した結果の例

```bash
[
  { id: 0, val: 'Bobby Tables!' },
  { id: 1, val: 'Bobby Tables!' },
  { id: 2, val: 'Bobby Tables!!' },
  { id: 3, val: 'Bobby Tables!' },
  { id: 4, val: 'Bobby Tables!!' }
]
```

### 参考文献

1. [Tableland Docs](https://docs.tableland.xyz/quickstarts/sdk-quickstart)
2. [Quickstart](https://docs.tableland.xyz/quickstarts/sdk-quickstart)
3. [Quickstart Hardhat](https://docs.tableland.xyz/quickstarts/hardhat)
4. [Tableland + Filecoin: FEVM Support](https://mirror.xyz/tableland.eth/cLDRyLa7aMEf1y2sy-PhQtllnZ1YK_oxoS-U2Sf30_Y)
5. [Tutorials](https://docs.tableland.xyz/tutorials/)
