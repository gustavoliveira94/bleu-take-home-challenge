import { createConfig } from 'ponder';
import { http } from 'viem';
import 'dotenv/config'

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
      address: process.env.NFT_CONTRACT_ADDRESS as `0x${string}`,
      startBlock: 1,
    },
    bleuNFTStake: {
      network: 'anvil_localhost_testnet',
      abi: bleuNFTStake,
      address: process.env.STAKE_CONTRACT_ADDRESS as `0x${string}`,
      startBlock: 1,
    },
  },
});
