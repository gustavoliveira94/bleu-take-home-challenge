import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { constants } from '@/core/utils/constants';
import { localhost } from 'wagmi/chains';

interface ProvidersProps {
  children: ReactNode;
}

const config = createConfig({
  // Your dApps chains
  chains: [
    // mainnet, optimism, arbitrum, base, polygon,
    { ...localhost, id: 31337 },
  ],
  transports: {
    [31337]: http(constants.RPC_URL),
  },
  syncConnectedChain: true,
});

const queryClient = new QueryClient();

export const AllTheProviders = ({ children }: ProvidersProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

const customRender = (ui: ProvidersProps['children'], options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from @testing-library/react
export * from '@testing-library/react';

// Override the default render with our custom one
export { customRender as render };
