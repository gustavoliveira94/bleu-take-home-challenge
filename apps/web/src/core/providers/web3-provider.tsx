'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import type { ReactNode } from 'react';
import { http, WagmiProvider, createConfig } from 'wagmi';
import { localhost } from 'wagmi/chains';

import { constants } from '../utils/constants';
import { queryClient } from '@/configs/request/queryClient';

const walletConnectProjectId = '';

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [
      // mainnet, optimism, arbitrum, base, polygon,
      { ...localhost, id: 31337 },
    ],
    transports: {
      [31337]: http(constants.RPC_URL),
    },
    syncConnectedChain: true,

    // Required API Keys
    walletConnectProjectId,

    // Required App Info
    appName: 'Next Bleu Starter',
    // Optional App Info
    appDescription: 'Template for web3 next projects',
    appUrl: 'http://localhost:3000',
    appIcon: 'https://cdn-icons-png.flaticon.com/128/4064/4064205.png',
  })
);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          onConnect={({ address }) => {
            document.cookie = `wallet=${address};`;
          }}
          onDisconnect={() => {
            document.cookie = 'wallet=;';
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
