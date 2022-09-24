// export const API_URL = "http://tranquil-fortress-68446.herokuapp.com";
export const API_URL = "http://localhost:8000";
export const CHAINID = 97;
export const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const networkParams = {
    "0x61": {
      chainId: "0x61",
      rpcUrls: [RPC_URL],
      chainName: "Binance Testnet",
      nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
      blockExplorerUrls: ["https://testnet.bscscan.com"],
      iconUrls: ["https://image.shutterstock.com/image-vector/bnb-binance-cryptocurrency-coin-finance-600w-1940122603.jpg"]
    },
    "0x38": {
      chainId: "0x38",
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      chainName: "Binance Mainnet",
      nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
      blockExplorerUrl: ["https://bscscan.com"],
      iconUrls: [
        "https://image.shutterstock.com/image-vector/bnb-binance-cryptocurrency-coin-finance-600w-1940122603.jpg"
      ]
    }
};
  