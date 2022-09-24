import { useWeb3React } from "@web3-react/core";
import { removeInfo } from '../redux/accountSlice';
import { useDispatch } from 'react-redux';

export function useDisconnect() {
    const {  deactivate } = useWeb3React();
    const dispatch = useDispatch();
    const  disconnect = async () => {
        try {
            dispatch(removeInfo());
            deactivate();
            localStorage.setItem("connectedWallet","");
        } catch (err) {
            console.log(err);
        }
    }
    return {disconnect};
}