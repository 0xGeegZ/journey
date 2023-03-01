require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { FTMSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "ftmTestnet",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  networks: {
    ftmTestnet: {
      url: "https://rpc.testnet.fantom.network/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4002,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      ftmTestnet: FTMSCAN_API_KEY,
    },
  },
};
