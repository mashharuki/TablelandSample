// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

/**
 * サンプル用のコントラクト
 */
contract Lock is ERC721Holder {
    // The table token ID,
    uint256 public _tableId;
    // Table prefix for the table
    string private constant _TABLE_PREFIX = "my_hardhat_table";

    /**
     * コンストラクター
     */
    constructor() {
        console.log("contract deployed!");
    }

    /**
     * テーブルを作成するためのメソッド
     */
    function create() public payable {
        // テーブルを作成
        // ここで指定した コントラクトのアドレスのみが書き込み権限を持つ。
        _tableId = TablelandDeployments.get().create(
                address(this),
                SQLHelpers.toCreateFromSchema(
                    "id integer primary key," // Notice the trailing comma
                    "val text",
                    _TABLE_PREFIX
                )
        );
    }

    /**
     * データを新たに書き込むためのメソッド
     */
    function insert() public payable {

        uint256 testId = 1;

        // insert
        TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                _tableId,
                "id,val",
                string.concat(
                    Strings.toString(testId), // Convert to a string
                    ",",
                    SQLHelpers.quote(Strings.toHexString(msg.sender)) // Wrap strings in single quotes
                )
            )
        );
    }

    fallback() external payable {
        console.log("----- fallback:", msg.value);
    }

    receive() external payable {
        console.log("----- receive:", msg.value);
    }
}
