// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";

/**
 * @title CanvasGame 
 * @author mashharuki
 * @notice this contract is a sample contract
 */
contract CanvasGame is
  ERC721URIStorageUpgradeable,
  ERC721HolderUpgradeable,
  OwnableUpgradeable,
  PausableUpgradeable,
  ReentrancyGuardUpgradeable,
  UUPSUpgradeable
{
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  string private _baseURIString;
  string private _metadataTable;
  uint256 private _metadataTableId;
  string private _tablePrefix;
  // In a separate tutorial, we update this with a Nuxt app that displays x,y
  // and gives you the interface to move x,y.
  string private _externalURL;

  event MakeMove(address caller, uint256 tokenId, uint256 x, uint256 y);

  /**
   * initialize method
   */
  function initialize(
    string memory baseURI,
    string memory externalURL
  ) public initializer {
    __ERC721URIStorage_init();
    __ERC721Holder_init();
    __Ownable_init();
    __Pausable_init();
    __ReentrancyGuard_init();

    // Setup steps in our smart contract
  }

  /*
   * `createMetadataTable` initializes the token tables.
   */
  function createMetadataTable()
    external
    payable
    onlyOwner
    returns (uint256)
  {
    _metadataTableId = TablelandDeployments.get().create(
      address(this),
        /*
         *  CREATE TABLE prefix_chainId (
         *    int id,
         *    int x,
         *    int y
         *  );
         */
        SQLHelpers.toCreateFromSchema(
          "id int, x int, y int",
          _tablePrefix
        )
    );

    _metadataTable = SQLHelpers.toNameFromId(_tablePrefix, _metadataTableId);

    return _metadataTableId;
  }

  /*
   * `safeMint` allows anyone to mint a token in this project.
   * Any time a token is minted, a new row of metadata will be
   * dynamically inserted into the metadata table.
   */
  function safeMint(address to) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();

    // Insert table values upon minting.
    TablelandDeployments.get().mutate(
      address(this),
      _metadataTableId,
      SQLHelpers.toInsert(
        _tablePrefix,
        _metadataTableId,
        "id,x,y",
        string.concat(
          Strings.toString(newItemId),
          ",0,0"
        )
      )
    );

    // mint NFT
    _safeMint(to, newItemId, "");
    _tokenIds.increment();
    return newItemId;
  }

    /*
     * `makeMove` is an example of how to encode gameplay into both the
     * smart contract and the metadata. Whenever a token owner calls
     * make move, they can supply a new x,y coordinate and update
     * their token's metadata.
     */
    function makeMove(uint256 tokenId, uint256 x, uint256 y) public {
      // Check token ownership
      require(this.ownerOf(tokenId) == msg.sender, "Invalid owner");
      // Simple on-chain gameplay enforcement
      require(x < 512 && 0 <= x, "Out of bounds");
      require(y < 512 && 0 <= y, "Out of bounds");

      // Update the row in tableland
      string memory setters = string.concat(
        "x=",
        Strings.toString(x),
        ",y=",
        Strings.toString(y)
      );
      // Only update the row with the matching `id`
      string memory filters = string.concat("id=", Strings.toString(tokenId));

      // Update the table
      TablelandDeployments.get().mutate(
        address(this),
        _metadataTableId,
        SQLHelpers.toUpdate(
          _tablePrefix,
          _metadataTableId,
          setters,
          filters
        )
      );

      emit MakeMove(msg.sender, tokenId, x, y);
    }

    /*
     * `_baseURI` returns the base token URI.
     */
    function _baseURI() internal view override returns (string memory) {
      return _baseURIString;
    }

    /*
     * `tokenURI` is an example of how to turn a row in your table back into
     * erc721 compliant metadata JSON. here, we do a simple SELECT statement
     * with function that converts the result into json.
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );

        string memory base = _baseURI();

        // Give token viewers a way to get at our table metadata
    }

    /*
     * `setExternalURL` provides an example of how to update a field for every
     * row in an table.
     */
    function setExternalURL(string calldata externalURL) external onlyOwner {
        _externalURL = externalURL;
    }

    /**
     * @dev See {UUPSUpgradeable-_authorizeUpgrade}.
     */
    function _authorizeUpgrade(address) internal view override onlyOwner {} // solhint-disable no-empty-blocks

  /**
   * get methdataURI method
   */
  function metadataURI() public view returns (string memory) {
    string memory base = _baseURI();

    return string.concat(
      base,
      "query?statement=", // Simple read query setup
      "SELECT%20*%20FROM%20",
      _metadataTable
    );
  }
}