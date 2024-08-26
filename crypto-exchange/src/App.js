import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConnectWallet from './components/ConnectWallet';
import TokensPage from './components/TokensList';
import PortfolioPage from './components/PortfolioPage';
import { useState,useEffect } from 'react';
const App = () => {
    const handleConnect = () => {
        
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ConnectWallet onConnect={handleConnect} />} />
                <Route path="/tokens" element={<TokensList />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
            </Routes>
        </Router>
    );
};

export default App;
