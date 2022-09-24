import { useConnect } from "./useConnect";
import { injected } from "../utils/Connectors";
import { useWeb3React } from '@web3-react/core';
import { useErrorMessage } from "./useErrorMessage";
export const useConnectedWallet = () => {    
    const {connect} = useConnect();
    const {handleError} = useErrorMessage();
    const { activate} = useWeb3React();
    const handleConnectedConnection = async () => {
        try{

            let wallet = localStorage.connectedWallet;
            console.log(wallet);
            if(wallet != "" && wallet != undefined) {
                switch (wallet) {
                    case "metamask" :
                        console.log("under");
                        await connect(injected,wallet);                    
                        console.log("after connect");
                    break;
                    case "walletConnec" :
                        // connect(walletconnect);
                    break;
                    default : console.log("no choice");
                }
            }
        }catch(err){
            handleError(err);
        }
    }

    return {handleConnectedConnection};
}