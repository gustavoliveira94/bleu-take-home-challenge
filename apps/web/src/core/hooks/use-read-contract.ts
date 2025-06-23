import { useReadContract as useRead } from 'wagmi';

import { configContract } from '../utils/config-contracts';

interface IUseReadContract {
  contract: keyof typeof configContract;
  functionName: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  args: any[];
}

export const useReadContract = ({ args, contract, functionName }: IUseReadContract) => {
  const { abi, address } = configContract[contract];

  const { data, isLoading } = useRead({
    address,
    abi,
    functionName,
    args,
  });

  return {
    data,
    loading: isLoading,
  };
};
