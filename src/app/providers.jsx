'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import GlobalStyle from '@compoents/styles/GlobalStyle';

function Providers({ children }) {
  return (
    <>
      <GlobalStyle />
      <NextUIProvider>{children}</NextUIProvider>
    </>
  );
}

export default Providers;
