import { useQuery } from '@tanstack/react-query';

import { getNFTs } from '../ssr/home/getNFTs';
import { useAccount } from './use-account';

export const useNFTs = ({ address: addressCookie }: { address: `0x${string}` }) => {
  const { address } = useAccount();

  const { data, isLoading } = useQuery({
    queryKey: ['nfts', address || addressCookie],
    queryFn: () => getNFTs({ address }),
    enabled: !!address,
  });

  return {
    nfts: data || [],
    loading: isLoading,
  };
};
