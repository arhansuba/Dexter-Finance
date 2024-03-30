import React from 'react';
import { useSelector } from 'react-redux';
import { useConnection } from '@solana/wallet-adapter-react';

const Transactions = () => {
    const connection = useConnection();
    const recentTransactions = useSelector(state => state.provider.recentTransactions);

    console.log('Transaction.js');

    return (
        <div>
            <h2>Transactions</h2>
            {recentTransactions.length > 0 ? (
                <ul>
                    {recentTransactions.map((tx, index) => (
                        <li key={index}>
                            <p>Transaction Hash: {tx}</p>
                            <p>Status: {connection.getSignatureStatus(tx)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions to display at the moment.</p>
            )}
        </div>
    );
}

export default Transactions;

