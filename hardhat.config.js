require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      // Solana'da localhost ağında çalışmak için gerekli yapılandırmalar
      url: "http://localhost:8899", // Solana localhost RPC URL'si
      accounts: [process.env.PRIVATE_KEY] // Kullanılacak özel anahtar (örneğin: test için geliştirme ortamındaki bir cüzdanın özel anahtarı)
    },
    devnet: {
      // Solana'da devnet ağında çalışmak için gerekli yapılandırmalar
      url: "https://api.devnet.solana.com", // Solana devnet RPC URL'si
      accounts: [process.env.PRIVATE_KEY] // Kullanılacak özel anahtar (örneğin: test için geliştirme ortamındaki bir cüzdanın özel anahtarı)
    },
    testnet: {
      // Solana'da testnet ağında çalışmak için gerekli yapılandırmalar
      url: "https://api.testnet.solana.com", // Solana testnet RPC URL'si
      accounts: [process.env.PRIVATE_KEY] // Kullanılacak özel anahtar (örneğin: test için geliştirme ortamındaki bir cüzdanın özel anahtarı)
    },
    mainnet: {
      // Solana'da mainnet ağında çalışmak için gerekli yapılandırmalar
      url: "https://api.mainnet.solana.com", // Solana mainnet RPC URL'si
      accounts: [process.env.PRIVATE_KEY] // Kullanılacak özel anahtar (örneğin: gerçek ortamda kullanılan bir cüzdanın özel anahtarı)
    }
  }
};
