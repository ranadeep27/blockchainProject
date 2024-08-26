import React, { useState, useEffect } from 'react';
import { customERC20Contract } from '../etherum';


const PortfolioPage = () => {
    const [tokens, setTokens] = useState([]);
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        const loadTokens = async () => {
            const tokenAddresses = await tokenSwapContract.getTokens();
            const tokens = await Promise.all(tokenAddresses.map(async (address) => {
                const token = new ethers.Contract(address, customERC20ABI, provider);
                const balance = await token.balanceOf(userAddress);
                const name = await token.name();
                return { address, name, balance: ethers.utils.formatUnits(balance, 18) };
            }));
            setTokens(tokens);
        };

        const loadUserAddress = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            setUserAddress(accounts[0]);
        };

        loadTokens();
        loadUserAddress();
    }, [userAddress]);

    return (
        <div>
            <h2>Portfolio Page</h2>
            {tokens.map(token => (
                <div key={token.address}>
                    <h3>{token.name}</h3>
                    <p>Balance: {token.balance}</p>
                </div>
            ))}
        </div>
    );
};

export default PortfolioPage;
