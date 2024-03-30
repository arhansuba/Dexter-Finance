# Dexter - Solana DEX Aggregator

Dexter is an open-source DEX aggregator built on the Solana blockchain, utilizing the Orca Whirl Pools for liquidity aggregation. With Dexter, you can discover the best trading rates and liquidity across various decentralized exchanges on the Solana network.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Supported DEXes](#supported-dexes)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Best Rate Discovery:** Dexter automatically discovers the best rates across multiple DEXes on the Solana network.
- **Liquidity Aggregation:** Utilizing Orca Whirl Pools, Dexter aggregates liquidity to provide optimal trading experiences.
- **Low Slippage:** Our system minimizes trade slippage by optimizing trades across multiple liquidity pools.
- **Gas Efficiency:** Since it operates on the Solana blockchain, Dexter ensures low transaction costs and high throughput.
- **Easy Integration:** Dexter is designed to be integrated with dApps, wallets, and other platforms on the Solana network.

## Prerequisites

- Node.js version `14.x` or higher
- Solana wallet with SOL for transaction fees

## Installation

1. Clone the repository:
2. Navigate to the project directory
3. Install the required dependencies:
**
npm install
**

If you encounter any errors during installation, you can force install by running:
**
npm install --force
**

## Usage

1. Update the `.env` file with your Solana gateway provider's API key.

2. Start the application: npm run start

3. Interact with the platform via the provided web interface or API endpoints.

## Supported DEXes

- Orca
- Uniswap (included for comparison purposes)
- More DEXes to be supported in future updates...

Want to add support for another DEX? Check the [contributing guidelines](#contributing).

## Contributing

We welcome contributions to improve Dexter. Please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.

## Acknowledgements

- Thanks to Orca for providing the Whirl Pools liquidity aggregation service.
- The Solana community for creating a powerful blockchain platform.
- Uniswap for inspiration and comparison purposes.

---

Happy trading on Solana! If you have any issues, please [raise an issue](https://github.com/arhansuba/Dexter-Finance/issues)

