'use client';

import React from 'react';
import StyledComponentsRegistry from '../../lib/registry';
import { NextUIProvider } from '@nextui-org/react';
import GlobalStyle from '@compoents/styles/GlobalStyle';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Providers({ children }) {
  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <NextUIProvider>{children}</NextUIProvider>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
}

export default Providers;
