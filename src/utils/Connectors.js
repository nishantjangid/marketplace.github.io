import { InjectedConnector } from '@web3-react/injected-connector';
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
  } from '@web3-react/walletconnect-connector'
export const injected = new InjectedConnector();
export const walletconnect = new WalletConnectConnector({
    rpc: { 97: "https://data-seed-prebsc-1-s1.binance.org:8545/" },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: 2000
});