import { useWriteContract as useWrite } from 'wagmi';

import { useState } from 'react';
import { configContract } from '../utils/config-contracts';

interface IWriteContract {
  contract: keyof typeof configContract;
  functionName: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  args: any[];
}

export const useWriteContract = () => {
  const { writeContractAsync } = useWrite();

  const [loading, setLoading] = useState(false);

  const writeContract = async ({ contract, functionName, args }: IWriteContract) => {
    const { abi, address } = configContract[contract];

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

      throw e;
    }
  };

  return {
    writeContract,
    loading,
  };
};
