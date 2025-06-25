import { useQuery } from '@tanstack/react-query';

import { getNFTs } from '../ssr/home/getNFTs';
import { useAccount } from './use-account';

export const useNFTs = ({ address: addressCookie }: { address?: `0x${string}` }) => {
  const { address } = useAccount();

  const newAddress = address || addressCookie;

  const { data, isLoading } = useQuery({
    queryKey: ['nfts', newAddress],
    queryFn: () => getNFTs({ address: newAddress }),
  });

  return {
    nfts: data || [],
    loading: isLoading,
  };
};
