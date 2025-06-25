import { configContract } from '../utils/config-contracts';
import { useReadContract } from './use-read-contract';
import { useToast } from './use-toast';
import { useWaitForTransactionReceipt } from './use-wait-for-transaction-receipt';
import { useWriteContract } from './use-write-contract';

export const useStake = () => {
  const { toast } = useToast();

  const { setTxHash } = useWaitForTransactionReceipt({ query: 'nfts' });

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
      toast({ message: 'Staking successful' });
    } catch (error) {
      toast({ message: 'Error staking', type: 'error' });
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
      toast({ message: 'Unstaking successful' });
    } catch (error) {
      toast({ message: 'Error unstaking', type: 'error' });
    }
  };

  return {
    stake,
    unStake,
    loading,
  };
};
