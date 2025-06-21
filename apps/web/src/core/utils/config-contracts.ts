import { abi as stakeAbi } from '@/core/utils/abis/BleuNFTStaker.json';
import { abi as mintAbi } from '@/core/utils/abis/bleuNFT.json';

export const configContract = {
  mint: {
    address: '0x9d4454B023096f34B160D6B654540c56A1F81688' as `0x${string}`,
    abi: mintAbi,
  },
  stake: {
    address: '0x36C02dA8a0983159322a80FFE9F24b1acfF8B570' as `0x${string}`,
    abi: stakeAbi,
  },
};
