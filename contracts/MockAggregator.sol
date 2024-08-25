// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AggregatorV3Interface.sol";

contract MockAggregator is AggregatorV3Interface {
    int256 private _price;

    constructor(int256 initialPrice) {
        _price = initialPrice;
    }

    function setPrice(int256 newPrice) external {
        _price = newPrice;
    }

    function decimals() external view override returns (uint8) {
        return 18; // Example decimals
    }

    function description() external view override returns (string memory) {
        return "Mock Aggregator";
    }

    function getRoundData(uint80 /* _roundId */)
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, _price, block.timestamp, block.timestamp, 0);
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, _price, block.timestamp, block.timestamp, 0);
    }
}
