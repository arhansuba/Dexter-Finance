import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
const web3 = require('@solana/web3.js');
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
const anchor = require("@project-serum/anchor");
const { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } = anchor.web3;

async function main() {
    // Connect to the local cluster.
    const provider = anchor.Provider.local();
    anchor.setProvider(provider);

    // Create the program.
    const program = anchor.workspace.Aggregator;

    // Configure your contract parameters here.
    const routers = [
        new PublicKey("YOUR_ROUTER_ADDRESS_1"),
        new PublicKey("YOUR_ROUTER_ADDRESS_2"),
        // Add more routers if needed
    ];
    const defaultSlippagePercent = 2; // Example slippage percent value

    // Deploy the program.
    const aggregator = await program.state.rpc.initialize(
        routers,
        defaultSlippagePercent,
        {
            accounts: {
                state: await program.state.create({
                    accounts: {
                        rent: SYSVAR_RENT_PUBKEY,
                        systemProgram: SystemProgram.programId,
                    },
                }),
                owner: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [provider.wallet.payer],
            instructions: [],
        }
    );

    console.log("Aggregator deployed to:", aggregator);

    const payer = Keypair.generate();

const connection = new Connection(
  clusterApiUrl('devnet'),
  'confirmed'
);

const airdropSignature = await connection.requestAirdrop(
  payer.publicKey,
  LAMPORTS_PER_SOL,
);

await connection.confirmTransaction(airdropSignature);
}

main().then(() => process.exit());
