// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract E2I2Token is ERC20{
    constructor() public ERC20("e2i2token","EIT"){
        // mint 10000 token
        _mint(msg.sender, 10000*10**uint(decimals()));
    }
}




