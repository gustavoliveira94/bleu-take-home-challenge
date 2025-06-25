import { readContract as read } from 'wagmi/actions';

import { configContract } from '../utils/config-contracts';
import { config } from '../providers/web3-provider';

interface IReadContract {
  contract: keyof typeof configContract;
  functionName: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  args: any[];
}

export const useReadContract = () => {
  const readContract = async ({ args, contract, functionName }: IReadContract) => {
    const { abi, address } = configContract[contract];

    const result = await read(config, {
      address,
      abi,
      functionName,
      args,
    });

    return result;
  };

  return {
    readContract,
  };
};
