import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { useAccount } from 'wagmi';

import { queryStakeByUserTotalCount } from '../queries/stake';
import { queryMintByUserCount } from '../queries/mint';
import { useReadContract } from './use-read-contract';

export const useUserInformations = () => {
  const { address } = useAccount();
  const { data } = useReadContract({
    contract: 'stake',
    functionName: 'rewardsOf',
    args: [address],
  });

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
    enabled: !!address,
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
    enabled: !!address,
  });

  return {
    totalStaked: totalStaked?.stakes?.totalCount || 0,
    totalNFTs: totalNFTsCount?.mints?.totalCount || 0,
    totalRewards: `${Number(data) / 10 ** 18 || 0} BLEU`,
  };
};
