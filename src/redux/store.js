import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import accountInfo from "./accountSlice";
import contractDetails from "./contractSlice";
import connected from "./connectedSlice";

const reducer = combineReducers({
    accountInfo,
    contractDetails,
    connected,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['accountInfo/setAccountInfo'],
      // Ignore these field paths in all actions
    //   ignoredActionPaths: ['meta.arg', 'accountInfo.provider'],
      // Ignore these paths in the state
      ignoredPaths: ['accountInfo.provider','accountInfo.contract'],
    },
  }), 
})

export default store;