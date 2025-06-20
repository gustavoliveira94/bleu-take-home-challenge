import { memoize } from '../../memoize'

import { abi as stakeAbi } from '@/core/utils/abis/BleuNFTStaker.json'
import { abi as mintAbi } from '@/core/utils/abis/bleuNFT.json'

const bleuNFT = () => mintAbi.filter(({ stateMutability }) => stateMutability !== 'view')
const bleuStake = () => stakeAbi.filter(({ stateMutability }) => stateMutability !== 'view')

const memoizeBleuNFT = memoize(bleuNFT)
const memoizeBleuStake = memoize(bleuStake)

export const setAbi = {
  mint: memoizeBleuNFT(),
  stake: memoizeBleuStake()
}