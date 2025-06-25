import { useEffect } from 'react';
import { useAccount as useAccountWagmi } from 'wagmi';

export const useAccount = () => {
  const { address, status } = useAccountWagmi();

  useEffect(() => {
    if (!address) {
      document.cookie = 'wallet=;';

      return;
    }

    document.cookie = `wallet=${address};`;
  }, [address]);

  return {
    address,
    status,
  };
};
