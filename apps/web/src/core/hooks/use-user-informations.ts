import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { graphQLClient } from '@/configs/graphql/graphql';

import { queryStakeByUserTotalCount } from '../queries/stake';
import { queryMintByUserCount } from '../queries/mint';
import { useReadContract } from './use-read-contract';

export const useUserInformations = () => {
  const { address } = useAccount();
  const { readContract } = useReadContract();

  const rewards = async () => {
    const result = await readContract({
      contract: 'stake',
      functionName: 'rewardsOf',
      args: [address],
    });

    return result as BigInt;
  };

  const { data: totalRewards } = useQuery<BigInt>({
    queryKey: ['total-rewards'],
    queryFn: () => rewards(),
    enabled: !!address,
  });

  const { data: totalStaked } = useQuery<{ stakes: { totalCount: number } }>({
    queryKey: ['stake-by-user-count'],
    queryFn: () =>
      graphQLClient.request(
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
      graphQLClient.request(
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
    totalRewards: `${Number(totalRewards) / 10 ** 18 || 0} BLEU`,
  };
};
