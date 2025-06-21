import { useWriteContract } from './use-write-contract';
import { useWaitForTransactionReceipt } from './use-wait-for-transaction-receipt';
import { useToast } from './use-toast';

export const useMint = () => {
  const { toast } = useToast();

  const { setTxHash } = useWaitForTransactionReceipt({ query: 'mints' });

  const { writeContract, loading } = useWriteContract();

  const mint = async ({ tokenId }: { tokenId: number }) => {
    try {
      const tx = await writeContract({
        contract: 'mint',
        args: [tokenId],
        functionName: 'mint',
      });

      setTxHash(tx!);
      toast({ message: 'Minting successful' });
    } catch (error) {
      toast({ message: 'Error minting', type: 'error' });
    }
  };

  return {
    mint,
    loading,
  };
};
