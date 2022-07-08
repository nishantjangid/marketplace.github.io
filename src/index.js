import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {TransactionProvider} from "./context/TransactionContext";
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import store from './redux/store';  
import {Provider} from "react-redux";
import { ethers } from 'ethers';

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000
  return library;
}

const theme = createTheme({
  
})
theme.typography.h3 = {
  fontSize: '1.2rem',
  
  '@media (min-width:600px)': {
      fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
  },
};

ReactDOM.render(
  <TransactionProvider >
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </React.StrictMode>
    </Provider>
    </Web3ReactProvider>
  </TransactionProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
