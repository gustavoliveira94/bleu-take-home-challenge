import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useWaitForTransactionReceipt as useWaitForTransaction } from 'wagmi';

interface IUseWaitForTransactionReceipt {
  queries: string[];
}

export const useWaitForTransactionReceipt = ({ queries }: IUseWaitForTransactionReceipt) => {
  const client = useQueryClient();

  const [txHash, setTxHash] = useState('');
  const [onSuccess, setOnSuccess] = useState<(() => void) | null>(null);
  const [onError, setOnError] = useState<(() => void) | null>(null);

  const { isSuccess, isError } = useWaitForTransaction({
    hash: txHash as `0x${string}`,
  });

  useEffect(() => {
    if (isError && onError) {
      onError();
    }

    if (isSuccess) {
      const timeout = setTimeout(() => {
        queries.map((query) => client.invalidateQueries({ queryKey: [query] }));
      }, 2000);

      if (onSuccess) {
        onSuccess();
      }

      return () => clearTimeout(timeout);
    }
  }, [isSuccess, isError]);

  const setTx = (hash: string, callbacks?: { onSuccess?: () => void; onError?: () => void }) => {
    setTxHash(hash);
    setOnSuccess(() => callbacks?.onSuccess || null);
    setOnError(() => callbacks?.onError || null);
  };

  return {
    setTxHash: setTx,
  };
};
