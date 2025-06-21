import { abi as stakeAbi } from '@/core/utils/abis/BleuNFTStaker.json'
import { abi as mintAbi } from '@/core/utils/abis/bleuNFT.json'

export const configWriteContract = {
  mint: {
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`,
    abi: mintAbi
  },
  stake: {
    address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as `0x${string}`,
    abi: stakeAbi
  }
}