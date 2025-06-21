import { createConfig } from 'ponder';
import { http } from 'viem';

import { bleuNFTMint } from './abis/bleuNFTMint';
import { bleuNFTStake } from './abis/bleuNFTStake';

export default createConfig({
  networks: {
    anvil_localhost_testnet: {
      chainId: 31337,
      // This is Anvil's default RPC URL. Make sure you're running it.
      transport: http('http://localhost:8545'),
    },
  },
  contracts: {
    bleuNFT: {
      network: 'anvil_localhost_testnet',
      abi: bleuNFTMint,
      address: '0x9d4454B023096f34B160D6B654540c56A1F81688',
      startBlock: 1,
    },
    bleuNFTStake: {
      network: 'anvil_localhost_testnet',
      abi: bleuNFTStake,
      address: '0x36C02dA8a0983159322a80FFE9F24b1acfF8B570',
      startBlock: 1,
    },
  },
});
