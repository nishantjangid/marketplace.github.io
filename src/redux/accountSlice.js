import { createSlice } from '@reduxjs/toolkit'

// Slice

const slice = createSlice({
    name: 'accountInfo',
    initialState: {
        provider: null,
        accountId: null,
        chainId: null,
        wallet:null,
        contract:null,
        isConnected:false,
    },
    reducers: {
        setAccountInfo: (state, action) => {     
            console.log(action);
            state.provider = action.payload.connector;
            state.accountId = action.payload.account;
            state.chainId = action.payload.chainId;
            state.wallet = action.payload.walletType;
            state.contract = action.payload.contract;
            state.isConnected = action.payload.isConnected;
            localStorage.setItem('accountId', action.payload.account)
            localStorage.setItem('provider', JSON.stringify(action.payload.connector))
            localStorage.setItem('chainId',action.payload.chainId)
            localStorage.setItem('wallet',action.payload.walletType)
            localStorage.setItem('isConnected',action.payload.isConnected)
            // localStorage.setItem('contract',JSON.stringify(action.payload.contract))
        },
        removeAccountInfo: (state, action) => {
            state.provider = null;
            state.accountId = null;
            state.chainId = null;
            state.wallet = null;
            state.contract = null;
            state.isConnected = false;
            localStorage.removeItem('accountId')
            localStorage.removeItem('provider')
            localStorage.removeItem('chainId')
            localStorage.removeItem('wallet')
            localStorage.removeItem('contract')
            localStorage.removeItem('isConnected')
        },
    },
});

export default slice.reducer

// Actions

const { setAccountInfo, removeAccountInfo } = slice.actions

export const accountInfos = (a) => async dispatch => {
    try {                
        
        dispatch(setAccountInfo(a));
    } catch (e) {
        return console.error(e.message);
    }
}

export const removeInfo = () => async dispatch => {
    try {        
        console.log("called");
        return dispatch(removeAccountInfo())
    } catch (e) {
        return console.error(e.message);
    }
}