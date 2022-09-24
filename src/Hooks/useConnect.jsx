import { useState } from "react"
import { useErrorMessage } from "./useErrorMessage";
import { useWeb3React } from '@web3-react/core';

export function useConnect(){
    const [wallet,setWallet] = useState("");
    const { activate} = useWeb3React();
    const {handleError} = useErrorMessage();
    const connect = async (provider,walletType) => {     
        console.log(provider,walletType);
        await activate(provider, async (error) => {
            handleError(error);
            console.log(error);
        });
        setWallet(walletType);
        localStorage.setItem('connectedWallet',walletType);        
    } 
    return {connect,wallet};
}

