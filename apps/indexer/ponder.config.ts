import { createConfig } from 'ponder';
import { http } from 'viem';

import { bleuNFTMint } from './abis/bleuNFTMint';
import { bleuNFTStake } from './abis/bleuNFTStake';

export default createConfig({
  networks: {
    anvil_localhost_testnet: {
      chainId: 31337,
      // This is Anvil's default RPC URL. Make sure you're running it.
      transport: http(process.env.RPC_URL),
    },
  },
  contracts: {
    bleuNFT: {
      network: 'anvil_localhost_testnet',
      abi: bleuNFTMint,
      address: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9' as `0x${string}`,
      startBlock: 1,
    },
    bleuNFTStake: {
      network: 'anvil_localhost_testnet',
      abi: bleuNFTStake,
      address: '0x0165878A594ca255338adfa4d48449f69242Eb8F' as `0x${string}`,
      startBlock: 1,
    },
  },
});
