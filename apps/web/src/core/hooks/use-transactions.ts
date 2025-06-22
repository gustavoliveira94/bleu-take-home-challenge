import { useQuery } from '@tanstack/react-query';

import { graphQLClient } from '@/configs/graphql/graphql';

import { queryAllStake, queryUnstake } from '../queries/stake';
import { IStake } from '../interfaces/stake';
import { formatAddress } from '../utils/format-address';
import { formatTimestamp } from '../utils/format-timestamp';
import { IMint } from '../interfaces/mint';
import { queryMint } from '../queries/mint';

export const useTransactions = () => {
  const { data: allMints, isLoading: loadingMints } = useQuery<{ mints: { items: IMint[] } }>({
    queryKey: ['all-mints'],
    queryFn: () =>
      graphQLClient.request(
        `
        ${queryMint}
      `
      ),
  });

  const formatAllMints = allMints?.mints?.items.map((mint) => [
    mint.tokenId,
    formatAddress({ address: mint.owner }),
    formatTimestamp({ timestamp: Number(mint.timestamp) }),
  ]);

  const { data: allStakes, isLoading: loadingStakes } = useQuery<{
    allStakes: { items: IStake[] };
  }>({
    queryKey: ['all-stakes'],
    queryFn: () =>
      graphQLClient.request(
        `
        ${queryAllStake}
      `
      ),
  });

  const formatAllStakes = allStakes?.allStakes?.items.map((stake) => [
    stake.tokenId,
    formatAddress({ address: stake.owner }),
    formatTimestamp({ timestamp: Number(stake.timestamp) }),
  ]);

  const { data: allUnstakes, isLoading: loadingUnstake } = useQuery<{
    unstakes: { items: IMint[] };
  }>({
    queryKey: ['all-unstake'],
    queryFn: () =>
      graphQLClient.request(
        `
        ${queryUnstake}
      `
      ),
  });

  const formatAllUnstake = allUnstakes?.unstakes?.items.map((unstake) => [
    unstake.tokenId,
    formatAddress({ address: unstake.owner }),
    formatTimestamp({ timestamp: Number(unstake.timestamp) }),
  ]);

  return {
    stakes: formatAllStakes || [],
    mints: formatAllMints || [],
    unstake: formatAllUnstake || [],
    loadingUnstake,
    loadingMints,
    loadingStakes,
  };
};
