import React from 'react';

import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';

import StoreContext from '../utils/Store';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <CssBaseline/>
    <StoreContext>
      <Component {...pageProps} />
    </StoreContext>
  </>;
}

export default MyApp;
