import { graphQLClient } from '@/configs/graphql/graphql';
import { queryAllStake, queryUnstake } from '@/core/queries/stake';
import { queryMint } from '@/core/queries/mint';
import { formatAddress } from '@/core/utils/format-address';
import { formatTimestamp } from '@/core/utils/format-timestamp';
import { IMint } from '@/core/interfaces/mint';
import { IStake } from '@/core/interfaces/stake';

export const getTransactions = async () => {
  const [{ mints }, { allStakes }, { unstakes }] = await Promise.all([
    graphQLClient.request<{ mints: { items: IMint[] } }>(queryMint),
    graphQLClient.request<{ allStakes: { items: IStake[] } }>(queryAllStake),
    graphQLClient.request<{ unstakes: { items: IMint[] } }>(queryUnstake),
  ]);

  const formatAllMints = mints.items.map((mint) => [
    mint.tokenId,
    formatAddress({ address: mint.owner }),
    formatTimestamp({ timestamp: Number(mint.timestamp) }),
  ]);

  const formatAllStakes = allStakes.items.map((stake) => [
    stake.tokenId,
    formatAddress({ address: stake.owner }),
    formatTimestamp({ timestamp: Number(stake.timestamp) }),
  ]);

  const formatAllUnstake = unstakes.items.map((unstake) => [
    unstake.tokenId,
    formatAddress({ address: unstake.owner }),
    formatTimestamp({ timestamp: Number(unstake.timestamp) }),
  ]);

  return {
    stakes: formatAllStakes,
    mints: formatAllMints,
    unstake: formatAllUnstake,
  };
};
