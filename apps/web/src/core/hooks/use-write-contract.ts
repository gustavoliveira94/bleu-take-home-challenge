import { useWriteContract as useWrite } from 'wagmi';

import { useState } from 'react';
import { configWriteContract } from '../utils/hooks/use-write-contracts/config-write-contracts';

interface IWriteContract {
  contract: keyof typeof configWriteContract;
  functionName: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  args: any[];
}

export const useWriteContract = () => {
  const { writeContractAsync } = useWrite();

  const [loading, setLoading] = useState(false);

  const writeContract = async ({ contract, functionName, args }: IWriteContract) => {
    const { abi, address } = configWriteContract[contract];

    setLoading(true);

    try {
      const tx = await writeContractAsync({
        address,
        abi,
        functionName,
        args,
      });

      setLoading(false);

      return tx;
    } catch (e) {
      setLoading(false);

      return;
    }
  };

  return {
    writeContract,
    loading,
  };
};
