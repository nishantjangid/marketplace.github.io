import React, { useEffect } from 'react'

import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { useWeb3React } from '@web3-react/core';
import {initiateContract} from "../utils/ContractInfo";
export const TransactionContext = React.createContext();

export const TransactionProvider =  ({ children }) => {
    // const {connector, library, chainId, account, activate, deactivate, active, error} = useWeb3React();

    const injected = new InjectedConnector({ supportedChainIds: [1, 56, 97,3, 4, 5, 42] })
    
    const walletconnect = new WalletConnectConnector({
        rpc: { 1: "https://mainnet.infura.io/v3/3eca30b0aa6a4372ac8552a1c09a8ccd",
        56: "https://bsc-dataseed.binance.org/"},        
        bridge: 'https://bridge.walletconnect.org',
        qrcode: true,
        pollingInterval: 10000,
        qrcodeModalOptions: {
            mobileLinks: [
                "metamask",
                 "trust",
            ],
        },
    });


    return (
        <TransactionContext.Provider value={{injected,walletconnect}}>
            {children}
        </TransactionContext.Provider>
    )
}

