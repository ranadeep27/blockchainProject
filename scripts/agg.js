const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying mock aggregators with the account:", deployer.address);

    // Define initial prices for each mock aggregator
    const initialPrices = [
        hre.ethers.utils.parseUnits("1", 18), // 1 ETH
        hre.ethers.utils.parseUnits("2", 18), // 2 ETH
        hre.ethers.utils.parseUnits("3", 18), // 3 ETH
        hre.ethers.utils.parseUnits("4", 18), // 4 ETH
        hre.ethers.utils.parseUnits("5", 18)  // 5 ETH
    ];

    const aggregatorAddresses = [];
    for (const price of initialPrices) {
        // Get the contract factory for MockAggregator
        const MockAggregatorFactory = await hre.ethers.getContractFactory("MockAggregator");
        // Deploy the aggregator contract with the initial price
        const mockAggregator = await MockAggregatorFactory.deploy(price);
        await mockAggregator.deployed();
        console.log(`MockAggregator deployed to: ${mockAggregator.address}`);
        aggregatorAddresses.push(mockAggregator.address);
    }

    // Output deployed aggregator addresses
    console.log("Mock Aggregator Addresses:", aggregatorAddresses);
}

// Run the script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
