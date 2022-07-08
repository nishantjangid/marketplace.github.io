import { createSlice } from '@reduxjs/toolkit'

// Slice

const slice = createSlice({
    name: 'connected',
    initialState: {
        connected: false,
    },
    reducers: {
        setConnected: (state, action) => {            
            state.connected = action.payload.connected;
            localStorage.setItem('connected', action.payload.connected)
        },
        removeConnected: (state, action) => {
            state.connected = false;
            localStorage.removeItem('connected')
        },
    },
});

export default slice.reducer

// Actions

const { setConnected, removeConnected } = slice.actions

export const setConnectedState = (a) => async dispatch => {
    try {                
        
        dispatch(setConnected(a));
    } catch (e) {
        return console.error(e.message);
    }
}

export const removeConnectedState = () => async dispatch => {
    try {        
        return dispatch(removeConnected())
    } catch (e) {
        return console.error(e.message);
    }
}