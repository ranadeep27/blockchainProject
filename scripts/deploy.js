const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Define the tokens to be created
    const tokens = [
        { name: "Token1", symbol: "TKN1", initialSupply: hre.ethers.utils.parseUnits("1000000", 18) },
        { name: "Token2", symbol: "TKN2", initialSupply: hre.ethers.utils.parseUnits("2000000", 18) },
        { name: "Token3", symbol: "TKN3", initialSupply: hre.ethers.utils.parseUnits("3000000", 18) },
        { name: "Token4", symbol: "TKN4", initialSupply: hre.ethers.utils.parseUnits("4000000", 18) },
        { name: "Token5", symbol: "TKN5", initialSupply: hre.ethers.utils.parseUnits("5000000", 18) }
    ];

    // Deploy tokens and log their addresses
    for (const token of tokens) {
        const CustomERC20 = await hre.ethers.getContractFactory("CustomERC20");
        const tokenContract = await CustomERC20.deploy(token.name, token.symbol, token.initialSupply);
        await tokenContract.deployed();

        console.log(`${token.name} (${token.symbol}) deployed to: ${tokenContract.address}`);
    }
}

// Run the script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
