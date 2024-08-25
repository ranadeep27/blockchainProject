// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AggregatorV3Interface.sol";

contract TokenSwap is Ownable(msg.sender) {

    // Token struct
    struct Token {
        address tokenAddress;
        AggregatorV3Interface priceFeed;
        uint256 basePrice; // The initial base price of the token
        uint256 priceAdjustmentFactor; // The factor by which price changes
    }

    // List of tokens
    Token[] public tokens;

    // Mapping of token address to its index in the `tokens` array
    mapping(address => uint256) public tokenToIndex;

    // Mapping of token address to its current price
    mapping(address => uint256) public tokenPrices;

    constructor(
        address[] memory tokenAddresses,
        address[] memory priceFeeds,
        uint256[] memory basePrices,
        uint256[] memory priceAdjustmentFactors
    ) {
        require(
            tokenAddresses.length == priceFeeds.length &&
            tokenAddresses.length == basePrices.length &&
            tokenAddresses.length == priceAdjustmentFactors.length,
            "Input arrays must have the same length"
        );

        for (uint i = 0; i < tokenAddresses.length; i++) {
            Token memory newToken = Token({
                tokenAddress: tokenAddresses[i],
                priceFeed: AggregatorV3Interface(priceFeeds[i]),
                basePrice: basePrices[i],
                priceAdjustmentFactor: priceAdjustmentFactors[i]
            });
            tokens.push(newToken);
            tokenToIndex[tokenAddresses[i]] = i;
            tokenPrices[tokenAddresses[i]] = basePrices[i];
        }
    }

    function swap(address fromToken, address toToken, uint256 amount) external {
        require(tokenPrices[fromToken] > 0 && tokenPrices[toToken] > 0, "Invalid tokens");
        require(amount > 0, "Amount must be greater than zero");

        uint256 fromTokenPrice = tokenPrices[fromToken];
        uint256 toTokenPrice = tokenPrices[toToken];
        
        uint256 amountToReceive = (amount * fromTokenPrice) / toTokenPrice;

        ERC20(fromToken).transferFrom(msg.sender, address(this), amount);
        ERC20(toToken).transfer(msg.sender, amountToReceive);

        // Adjust prices based on the transaction
        adjustPrice(fromToken, true);
        adjustPrice(toToken, false);
    }

    function sell(address token, uint256 amount) external {
        require(tokenPrices[token] > 0, "Invalid token");
        require(amount > 0, "Amount must be greater than zero");

        uint256 tokenPrice = tokenPrices[token];
        uint256 amountToReceive = (amount * tokenPrice) / 1 ether;

        ERC20(token).transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amountToReceive);

        // Adjust price based on the transaction
        adjustPrice(token, false);
    }

    function adjustPrice(address token, bool increase) internal {
        uint256 currentPrice = tokenPrices[token];
        uint256 adjustment = tokens[tokenToIndex[token]].priceAdjustmentFactor;

        if (increase) {
            // Increase the price
            tokenPrices[token] = currentPrice + (currentPrice * adjustment / 100);
        } else {
            // Decrease the price
            tokenPrices[token] = currentPrice - (currentPrice * adjustment / 100);
        }
    }

    function getLatestPrice(address token) public view returns (uint256) {
        AggregatorV3Interface priceFeed = tokens[tokenToIndex[token]].priceFeed;
        (,int price,,,) = priceFeed.latestRoundData();
        return uint256(price);
    }
}

contract CustomERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
