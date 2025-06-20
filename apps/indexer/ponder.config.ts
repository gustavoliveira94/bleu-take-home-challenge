import { createConfig, mergeAbis } from 'ponder';
import { http, type Abi, erc721Abi } from 'viem';

import { bleuNFT } from './abis/bleuNFT';

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
      // TODO: Replace with the actual abi of the contract
      // Note: You'll probably want to use a mergeAbis function to merge the abi with the erc721 abi
      abi: bleuNFT,
      // TODO: Replace with the actual address of the contract
      address: '0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25',
      startBlock: 1,
    },
    bleuNFTStake: {
      network: 'anvil_localhost_testnet',
      // TODO: Replace with the actual abi of the contract
      // Note: You'll probably want to use a mergeAbis function to merge the abi with the erc721 abi
      abi: erc721Abi,
      // TODO: Replace with the actual address of the contract
      address: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
      startBlock: 1,
    },
  },
});
