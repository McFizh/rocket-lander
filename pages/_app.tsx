import React from 'react';

import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';

import StoreContext from '../utils/Store';

import '../styles/globals.css';

function SafeHydrate({ children }: { children: React.ReactChild[] }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return <SafeHydrate>
    <CssBaseline/>
    <StoreContext>
      <Component {...pageProps} />
    </StoreContext>
  </SafeHydrate>;
}

export default MyApp;
