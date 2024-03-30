const web3 = require('@solana/web3.js');
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
const anchor = require('@project-serum/anchor');
const { PublicKey } = anchor.web3;

const SPL_TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

async function seed() {
    const provider = anchor.Provider.env();
    const connection = provider.connection;
    const wallet = provider.wallet.payer;

    // Örnek SPL tokenleri
    const WEth = new PublicKey('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
    const USDC = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    const tokenWETH = new anchor.web3.PublicKey("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    const tokenUSDC = new anchor.web3.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

    // Token miktarını ayarla
    const tokens = (n) => {
        return new anchor.BN(n);
    }

    // Token transferi gerçekleştirme
    async function transferToken(fromToken, toToken, amount) {
        const tx = await connection.requestAirdrop(wallet.publicKey, amount);
        await connection.confirmTransaction(tx);

        const owner = wallet.publicKey;
        const ownerTokenAccount = await getTokenAccount(owner, fromToken);
        const ownerTokenAccountInfo = await connection.getAccountInfo(ownerTokenAccount);
        const ownerAccount = new anchor.web3.Account();
        const ownerAccountInfo = await connection.getAccountInfo(ownerAccount.publicKey);
        const systemProgramId = new PublicKey('11111111111111111111111111111111');
        const tokenProgramId = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

        const ix = anchor.web3.SystemProgram.transfer({
            fromPubkey: owner.publicKey,
            toPubkey: ownerTokenAccount,
            lamports: 1000000000,
        });
        await connection.sendTransaction(new anchor.web3.Transaction().add(ix), [wallet]);

        const instruction = anchor.web3.SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: ownerAccount.publicKey,
            lamports: 1000000000,
            space: 165,
            programId: systemProgramId,
        });
        await connection.sendTransaction(new anchor.web3.Transaction().add(instruction), [wallet]);

        const transferIx = anchor.web3.Token.createTransferInstruction(
            SPL_TOKEN_PROGRAM_ID,
            ownerTokenAccount,
            ownerAccount,
            owner,
            [],
            amount,
        );

        await connection.sendTransaction(
            new anchor.web3.Transaction().add(transferIx),
            [wallet],
            { skipPreflight: true }
        );
        console.log("Token transfered successfully");
    }

    // Token hesabını al
    async function getTokenAccount(owner, mint) {
        const accountInfo = await connection.getTokenAccountsByOwner(owner, {
            mint,
        });

        if (accountInfo.value.length == 0) {
            const tokenAccount = await connection.createTokenAccount(
                wallet.publicKey,
                mint
            );
            return tokenAccount;
        } else {
            return accountInfo.value[0].pubkey;
        }
    }

    // Token transferini gerçekleştir
    await transferToken(tokenWETH, tokenUSDC, tokens(100));
}

seed().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
});

