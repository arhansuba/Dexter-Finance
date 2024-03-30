import { Keypair } from '@solana/web3.js';
import { setNetwork, setAccount, setProvider } from './reducers/provider';

export const loadNetwork = async (connection, dispatch) => {
  try {
    const { solanaVersion } = await connection.getVersion();
    dispatch(setNetwork(solanaVersion));
    return solanaVersion;
  } catch (error) {
    console.error('Error fetching network version:', error);
    throw error;
  }
};
export const swap = async (provider, contracts, path, router, amount, minAmountOut, slippage, deadline, dispatch) => {
  // Swap fonksiyonunun içeriği
};

export const loadAccount = async (connection, dispatch) => {
  try {
    const keypair = Keypair.generate(); // Yeni bir anahtar çifti oluştur
    const account = keypair.publicKey.toBase58(); // Hesap adresini al
    dispatch(setAccount(account));
    return account;
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
};

export const loadTokens = async (erc20s, dispatch) => {
  try {
    let symbols = new Map();
    for (let i = 0; i < erc20s.length; i++) {
      symbols.set(await erc20s[i].symbol(), await erc20s[i].getAddress());
    }
    dispatch(setProvider(symbols));
    console.log('symbols:', symbols);
    return symbols;
  } catch (error) {
    console.error('Error loading tokens:', error);
    throw error;
  }
};
