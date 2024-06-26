'use client';

import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function QueryClientProvider({ children }: PropsWithChildren) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}

export default QueryClientProvider;
