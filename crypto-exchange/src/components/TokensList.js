import React, { useState, useEffect } from 'react';
import { tokenSwapContract, customERC20Contract } from '../ethereum';


const TokensPage = () => {
    const [tokens, setTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState('');
    const [amount, setAmount] = useState('');
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        const loadTokens = async () => {
            const tokenAddresses = await tokenSwapContract.getTokens();
            const tokens = await Promise.all(tokenAddresses.map(async (address) => {
                const token = new ethers.Contract(address, customERC20ABI, provider);
                const name = await token.name();
                return { address, name };
            }));
            setTokens(tokens);
        };

        const loadUserAddress = async () => {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            setUserAddress(accounts[0]);
        };

        loadTokens();
        loadUserAddress();
    }, []);

    const handleSwap = async () => {
        await tokenSwapContract.swap(selectedToken, amount);
    };

    return (
        <div>
            <h2>Tokens Page</h2>
            <select onChange={(e) => setSelectedToken(e.target.value)} value={selectedToken}>
                {tokens.map(token => (
                    <option key={token.address} value={token.address}>{token.name}</option>
                ))}
            </select>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <button onClick={handleSwap}>Swap</button>
        </div>
    );
};

export default TokensPage;
