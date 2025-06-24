import { useEffect } from 'react';
import { useAccount as useAccountWagmi } from 'wagmi';

export const useAccount = () => {
  const { address, status } = useAccountWagmi();

  useEffect(() => {
    document.cookie = 'wallet=;';
    document.cookie = `wallet=${address};`;
  }, [address]);

  return {
    address,
    status,
  };
};
