// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

/**
 * Starter Contract
 */
contract Starter is ERC721Holder {
      // The table token ID
      uint256 private _tableId;
      // Table prefix for the table
      string private constant _TABLE_PREFIX = "my_smart_contract_table";

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

      /**
       * データを更新するためのメソッド
       * @param myId ID
       * @param myVal 更新後の値
       */
      function update(uint256 myId, string memory myVal) public payable {
            // Set values to update, like the "val" column to the function input param
            string memory setters = string.concat(
                  "val=",
                  SQLHelpers.quote(myVal) // Wrap strings in single quotes
            );
            // Only update the row with the matching `id`
            string memory filters = string.concat(
                  "id=",
                  Strings.toString(myId)
            );
            // update
            TablelandDeployments.get().mutate(
                  address(this),
                  _tableId,
                  SQLHelpers.toUpdate(
                        _TABLE_PREFIX,
                        _tableId,
                        setters,
                        filters
                  )
            );
      }
}
