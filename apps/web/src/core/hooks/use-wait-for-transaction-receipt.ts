import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useWaitForTransactionReceipt as useWaitForTransaction } from 'wagmi';

interface IUseWaitForTransactionReceipt {
  query: string;
}

export const useWaitForTransactionReceipt = ({ query }: IUseWaitForTransactionReceipt) => {
  const client = useQueryClient();

  const [txHash, setTxHash] = useState('');

  const { isSuccess } = useWaitForTransaction({
    hash: txHash as `0x${string}`,
  });

  useEffect(() => {
    if (isSuccess) {
      client.invalidateQueries({
        queryKey: [query],
      });
    }
  }, [isSuccess]);

  return {
    setTxHash,
  };
};
