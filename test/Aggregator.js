/* eslint-disable no-undef */
const assert = require("assert");
const { Token, TOKEN_PROGRAM_ID, u64 } = require("@solana/spl-token");
const { Provider, web3 } = require("@project-serum/anchor");
const { PublicKey, SystemProgram } = web3;
const { Market } = require("@project-serum/serum");
const { TokenInstructions } = require("@project-serum/serum/lib/token-instructions");
const { sleep } = require("@solana/web3.js");

// Solana için ERC20 tokenlarının adresleri
const WETH = new PublicKey("ERC20_WETH_ADRESI");
const DAI = new PublicKey("ERC20_DAI_ADRESI");

const DEFAULT_SLIPPAGE_PERCENT = 2;

describe("Aggregator", () => {
  let provider;
  let program;

  before(async () => {
    // Solana sağlayıcısını başlat
    provider = new Provider(web3.Connection, web3.Provider.defaultOptions());
    
    // Aggregator programını başlat
    program = anchor.workspace.Aggregator;
  });

  it("should deploy the aggregator contract", async () => {
    // Aggregator kontratını dağıt
    await program.rpc.initialize(
      [
        provider.wallet.publicKey,
        config.UNISWAP.V2_ROUTER_02_ADDRESS,
        config.SUSHISWAP.V2_ROUTER_02_ADDRESS,
        //config.SMARTDEX.V2_ROUTER_02_ADDRESS
      ],
      DEFAULT_SLIPPAGE_PERCENT,
      {
        accounts: {
          aggregator: program.provider.wallet.publicKey,
          // eslint-disable-next-line no-undef
          router1: config.UNISWAP.V2_ROUTER_02_ADDRESS,
          router2: config.SUSHISWAP.V2_ROUTER_02_ADDRESS,
          //router3: config.SMARTDEX.V2_ROUTER_02_ADDRESS
        },
        signers: [provider.wallet.publicKey],
      }
    );

    // Aggregator kontratının başarıyla dağıtıldığını doğrula
    const state = await program.account.aggregator.fetch();
    assert.ok(state.owner.equals(provider.wallet.publicKey));
    assert.equal(state.whiteListedRouters[0], config.UNISWAP.V2_ROUTER_02_ADDRESS);
    assert.equal(state.whiteListedRouters[1], config.SUSHISWAP.V2_ROUTER_02_ADDRESS);
    //assert.equal(state.whiteListedRouters[2], config.SMARTDEX.V2_ROUTER_02_ADDRESS);
  });

  // Diğer testler buraya eklenebilir
});
