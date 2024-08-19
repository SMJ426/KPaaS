'use client';

import React from 'react';
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
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;