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
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      startBlock: 1,
    },
    bleuNFTStake: {
      network: 'anvil_localhost_testnet',
      abi: bleuNFTStake,
      address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      startBlock: 1,
    },
  },
});
