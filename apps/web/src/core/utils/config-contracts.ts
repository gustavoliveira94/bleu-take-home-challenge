import { abi as stakeAbi } from '@/core/utils/abis/BleuNFTStaker.json';
import { abi as mintAbi } from '@/core/utils/abis/bleuNFT.json';
import { constants } from './constants';

export const configContract = {
  mint: {
    address: constants.NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: mintAbi,
  },
  stake: {
    address: constants.STAKER_CONTRACT_ADDRESS as `0x${string}`,
    abi: stakeAbi,
  },
};
