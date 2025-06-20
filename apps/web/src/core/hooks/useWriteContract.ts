import { useWriteContract as useWrite } from "wagmi";

import { setAbi } from "../utils/hooks/useWriteContract/setAbi";
import { setAddress } from "../utils/hooks/useWriteContract/setAddress";

interface IWriteContract {
  contract: keyof typeof setAddress;
  functionName: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  args: any[];
}

export const useWriteContract = () => {
  const { writeContractAsync } = useWrite();

  const writeContract = async ({
    contract,
    functionName,
    args,
  }: IWriteContract) => {
    try {
      await writeContractAsync({
        address: setAddress[contract] as `0x${string}`,
        abi: setAbi[contract],
        functionName,
        args,
      });
    } catch (e) {
      return;
    }
  };

  return {
    writeContract,
  };
};
