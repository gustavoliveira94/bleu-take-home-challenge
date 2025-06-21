'use client';
import type { ReactNode } from 'react';
import { ThemeProvider } from './theme-proviver';
import { Web3Provider } from './web3-provider';
import { ToastProvider } from './toast-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ToastProvider />
      <Web3Provider>{children}</Web3Provider>
    </ThemeProvider>
  );
}
