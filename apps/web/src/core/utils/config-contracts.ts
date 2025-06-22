import { abi as stakeAbi } from '@/core/utils/abis/BleuNFTStaker.json';
import { abi as mintAbi } from '@/core/utils/abis/bleuNFT.json';

export const configContract = {
  mint: {
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`,
    abi: mintAbi,
  },
  stake: {
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as `0x${string}`,
    abi: stakeAbi,
  },
};
