import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { useAccount } from 'wagmi';

import { nftMockList } from '../utils/mock-nfts';

import { queryStakeByUserTotalCount } from '../queries/stake';
import { queryMintByUserCount } from '../queries/mint';

export const useUserInformations = () => {
  const { address } = useAccount();

  const { data: totalStaked } = useQuery<{ stakes: { totalCount: number } }>({
    queryKey: ['stake-by-user-count'],
    queryFn: () =>
      request(
        'http://localhost:42069',
        `
      ${queryStakeByUserTotalCount}
    `,
        {
          owner: address,
        }
      ),
  });

  const { data: totalNFTsCount } = useQuery<{ mints: { totalCount: number } }>({
    queryKey: ['minted-by-user-count'],
    queryFn: () =>
      request(
        'http://localhost:42069',
        `
      ${queryMintByUserCount}
    `,
        {
          owner: address,
        }
      ),
  });

  return {
    totalStaked: totalStaked?.stakes?.totalCount || 0,
    totalNFTs: totalNFTsCount?.mints?.totalCount || 0,
  };
};
