require('@nomiclabs/hardhat-ethers');
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');



const { INFURA_PROJECT_ID, PRIVATE_KEY } = process.env;

module.exports = {
    solidity: {
        version: "0.8.20", // Update this to match the version used in your contracts
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`0x${PRIVATE_KEY}`]
        }
    }
};
