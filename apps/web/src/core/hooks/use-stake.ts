import { configContract } from '../utils/config-contracts';
import { useWaitForTransactionReceipt } from './use-wait-for-transaction-receipt';
import { useWriteContract } from './use-write-contract';

export const useStake = () => {
  const { setTxHash } = useWaitForTransactionReceipt({ query: 'stakes' });

  const { writeContract, loading } = useWriteContract();

  const stake = async ({ tokenId }: { tokenId: number }) => {
    try {
      await writeContract({
        contract: 'mint',
        args: [configContract.stake.address, tokenId],
        functionName: 'approve',
      });

      const tx = await writeContract({
        contract: 'stake',
        args: [tokenId],
        functionName: 'stake',
      });

      setTxHash(tx!);
    } catch (error) {
      console.error('Error staking:', error);
    }
  };

  const unStake = async ({ tokenId }: { tokenId: number }) => {
    try {
      const tx = await writeContract({
        contract: 'stake',
        args: [tokenId],
        functionName: 'unstake',
      });

      setTxHash(tx!);
    } catch (error) {
      console.error('Error staking:', error);
    }
  };

  return {
    stake,
    unStake,
    loading,
  };
};
