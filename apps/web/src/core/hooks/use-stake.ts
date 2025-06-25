import { configContract } from '../utils/config-contracts';
import { useToast } from './use-toast';
import { useWaitForTransactionReceipt } from './use-wait-for-transaction-receipt';
import { useWriteContract } from './use-write-contract';

export const useStake = () => {
  const { toast } = useToast();

  const { setTxHash } = useWaitForTransactionReceipt({
    queries: ['nfts', 'total-rewards', 'stake-by-user-count'],
  });

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

      setTxHash(tx!, {
        onSuccess: () => toast({ message: 'Staking successful' }),
        onError: () => toast({ message: 'Error staking', type: 'error' }),
      });
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

      setTxHash(tx!, {
        onSuccess: () => toast({ message: 'Unstaking successful' }),
        onError: () => toast({ message: 'Error unstaking', type: 'error' }),
      });
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
