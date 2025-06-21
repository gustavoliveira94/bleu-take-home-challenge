import { useWriteContract } from './use-write-contract';
import { useWaitForTransactionReceipt } from './use-wait-for-transaction-receipt';

export const useMint = () => {
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
    } catch (error) {
      console.error('Error minting:', error);
    }
  };

  return {
    mint,
    loading,
  };
};
