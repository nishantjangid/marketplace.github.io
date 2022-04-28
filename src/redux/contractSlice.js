import { createSlice } from '@reduxjs/toolkit'

// Slice

const slice = createSlice({
    name: 'contractDetails',
    initialState: {
        bnbPrice: 0,
        tokenPerUsd:0,
    },
    reducers: {
        contractDetail: (state, action) => {            
            state.bnbPrice = action.payload.bnbPrice;
            state.tokenPerUsd = action.payload.tokenPerUsd;            
        },
        contractDetailRemove: (state, action) => {
            state.bnbPrice = 0;
            state.tokenPerUsd = 0; 
        },
    },
});

export default slice.reducer

// Actions

const { contractDetail, contractDetailRemove } = slice.actions

export const setContractDetail = (a) => async dispatch => {
    try {                            
        dispatch(contractDetail(a));
    } catch (e) {
        return console.error(e.message);
    }
}

export const removeContractDetail = () => async dispatch => {
    try {        
        return dispatch(contractDetailRemove())
    } catch (e) {
        return console.error(e.message);
    }
}