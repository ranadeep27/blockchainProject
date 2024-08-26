import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const ConnectWallet = ({ onConnect }) => {
    const navigate = useNavigate();

    const connectWallet = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            onConnect();
            navigate('/tokens');
        } catch (error) {
            console.error('User denied account access');
        }
    };

    return (
        <div>
            <h1>CryptoEx</h1>
            <button onClick={connectWallet}>Connect MetaMask</button>
        </div>
    );
};

export default ConnectWallet;
