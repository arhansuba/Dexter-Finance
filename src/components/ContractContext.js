/* eslint-disable no-undef */
import React, { createContext, useCallback, useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useDispatch } from 'react-redux';

import DAI_ABI from '../abis/Dai.json';
import WETH_ABI from '../abis/Weth.json';
import AGGREGATOR_ABI from '../abis/Aggregator.json';
import config from '../config.json';

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens
} from '../store/interactions';

export const ContractsContext = createContext();

export function ContractsProvider({ children }) {
  const [contracts, setContracts] = useState({});
  const dispatch = useDispatch();

  const fetchBlockchainData = useCallback(async () => {
    try {
      // Web3 bağlantısı oluştur
      const connection = new Connection(config.solana.rpcUrl);

      // Ağ kimliğini yükle
      const network = await loadNetwork(connection, dispatch);

      // Hesap bilgilerini yükle
      await loadAccount(connection, dispatch);

      // Akıllı sözleşmeleri yükle
      const dai = new PublicKey(config.solana.tokens.dai);
      const weth = new PublicKey(config.solana.tokens.weth);
      const aggregator = new PublicKey(config.solana.contracts.aggregator);

      const contractInstances = {
        aggregator: new web3.PublicKey(config.solana.contracts.aggregator),
        dai: new Token(connection, dai, TOKEN_PROGRAM_ID, null),
        weth: new Token(connection, weth, TOKEN_PROGRAM_ID, null)
      };

      await loadTokens(
        [contractInstances.dai, contractInstances.weth],
        dispatch
      );

      return contractInstances;
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
      throw error;
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBlockchainData()
      .then((contracts) => {
        setContracts(contracts);
        console.log('Contracts:', contracts);
      })
      .catch((error) => {
        console.error('Error fetching blockchain data:', error);
      });
  }, [fetchBlockchainData]);

  return (
    <ContractsContext.Provider value={contracts}>
      {children}
    </ContractsContext.Provider>
  );
}

