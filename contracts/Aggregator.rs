use anchor_lang::prelude::*;
use anchor_lang::solana_program::program_error::ProgramError;
use anchor_lang::solana_program::program_pack::Pack;
use anchor_lang::solana_program::pubkey::Pubkey;
use spl_token::instruction::transfer;

#[program]
mod dex_aggregator {
    use super::*;

    #[state]
    pub struct Aggregator {
        pub owner: Pubkey,
        pub default_slippage_percent: u16,
        pub white_listed_routers: Vec<Pubkey>,
    }

    impl Aggregator {
        #[initializer]
        pub fn initialize(ctx: Context<Initialize>, routers: Vec<Pubkey>, default_slippage_percent: u16) -> ProgramResult {
            ctx.accounts.state.owner = *ctx.accounts.owner.key;
            ctx.accounts.state.white_listed_routers = routers;
            ctx.accounts.state.default_slippage_percent = default_slippage_percent;
            Ok(())
        }

        pub fn swap_on_uniswap_fork(ctx: Context<SwapOnUniswapFork>, path: Vec<Pubkey>, amount_in: u64, min_amount_out_before_slippage: u64, max_slippage_percent: u16, deadline: u64) -> ProgramResult {
            // Swap implementation goes here
            Ok(())
        }

        pub fn get_best_amounts_out_on_uniswap_forks(ctx: Context<GetBestAmountsOutOnUniswapForks>, path: Vec<Pubkey>, amount: u64) -> ProgramResult {
            // Get best amounts out implementation goes here
            Ok(())
        }
    }

    #[derive(Accounts)]
    pub struct Initialize<'info> {
        #[account(init, payer = user, space = 8 + 8 + 32 * 10)]
        pub state: ProgramAccount<'info, Aggregator>,
        #[account(signer)]
        pub owner: AccountInfo<'info>,
        pub system_program: AccountInfo<'info>,
    }

    #[derive(Accounts)]
    pub struct SwapOnUniswapFork<'info> {
        #[account(mut)]
        pub state: ProgramAccount<'info, Aggregator>,
        pub system_program: AccountInfo<'info>,
    }

    #[derive(Accounts)]
    pub struct GetBestAmountsOutOnUniswapForks<'info> {
        #[account(mut)]
        pub state: ProgramAccount<'info, Aggregator>,
        pub system_program: AccountInfo<'info>,
    }
}
