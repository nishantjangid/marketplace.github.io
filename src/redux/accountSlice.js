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
    },
    reducers: {
        setAccountInfo: (state, action) => {            
            state.provider = action.payload.connector;
            state.accountId = action.payload.account;
            state.chainId = action.payload.chainId;
            state.wallet = action.payload.walletType;
            state.contract = action.payload.contract;
            localStorage.setItem('accountId', action.payload.account)
            localStorage.setItem('provider', JSON.stringify(action.payload.connector))
            localStorage.setItem('chainId',action.payload.chainId)
            localStorage.setItem('wallet',action.payload.walletType)
            // localStorage.setItem('contract',JSON.stringify(action.payload.contract))
        },
        removeAccountInfo: (state, action) => {
            state.provider = null;
            state.accountId = null;
            state.chainId = null;
            state.wallet = null;
            state.contract = null;
            localStorage.removeItem('accountId')
            localStorage.removeItem('provider')
            localStorage.removeItem('chainId')
            localStorage.removeItem('wallet')
            localStorage.removeItem('contract')
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
        return dispatch(removeAccountInfo())
    } catch (e) {
        return console.error(e.message);
    }
}