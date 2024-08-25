const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Replace these addresses with the addresses of the deployed CustomERC20 tokens
    const tokenAddresses = [
        "0xB88bDcb820e9620dE12000ec91D68E42a204D93d",
        "0x6d6e4e40AC5d06106aE3f5EFf2631fAC70eECe79",
        "0xff91269Cb0c545e61D3ec271ed8318eBD42f5f05",
        "0x26a0e7A1B07Fe4f6cCa007f946cF7E7d95f2F395",
        "0xF757a3Cae14a487B0dC9f86175eD5293C62447D3"
    ];

    // Replace with actual addresses of your custom aggregator contracts
    const priceFeeds = [
        '0x7c62f952d9dccD05d2AaEb2EA5604C8c54427CaC',
        '0x0FCa66D5e110eb7CDbA85f9bc66F11DfCa90Ec6F',
        '0xf010E105dfD17E0641e0a115093e6868257eC210',
        '0x2e3F47afCF50250Ed551fce59B63c8e464ED884d',
        '0x366c19FeA03330b3E7833d56Bd52eC34aDe3211f'
      ];

    // Define the base prices and price adjustment factors
    const basePrices = [
        hre.ethers.utils.parseUnits("1", 18), // Example: 1 ETH
        hre.ethers.utils.parseUnits("2", 18), // Example: 2 ETH
        hre.ethers.utils.parseUnits("3", 18), // Example: 3 ETH
        hre.ethers.utils.parseUnits("4", 18), // Example: 4 ETH
        hre.ethers.utils.parseUnits("5", 18)  // Example: 5 ETH
    ];

    const priceAdjustmentFactors = [5, 5, 5, 5, 5]; // 5% adjustment factor for all tokens

    // Deploy the TokenSwap contract
    const TokenSwapFactory = await hre.ethers.getContractFactory("TokenSwap", "contracts/TokenSwap.sol");
    const tokenSwap = await TokenSwapFactory.deploy(
        tokenAddresses,
        priceFeeds,
        basePrices,
        priceAdjustmentFactors
    );
    await tokenSwap.deployed();

    console.log(`TokenSwap deployed to: ${tokenSwap.address}`);

    // Output deployed contract addresses
    console.log("Token Addresses:", tokenAddresses);
    console.log("TokenSwap Address:", tokenSwap.address);
}

// Run the script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
