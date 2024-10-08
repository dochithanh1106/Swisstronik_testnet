// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract xxx is ERC20 {
    constructor() ERC20("THANH", "DCT") {}

    function mint() public {
        _mint(msg.sender, 100 * 10 ** decimals());
    }

    function burn() public {
        _burn(msg.sender, 100 * 10 ** decimals());
    }
}