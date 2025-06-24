import { graphQLClient } from '@/configs/graphql/graphql';
import { IMint } from '@/core/interfaces/mint';
import { INFT } from '@/core/interfaces/nft';
import { IStake } from '@/core/interfaces/stake';
import { queryMint } from '@/core/queries/mint';
import { queryStake } from '@/core/queries/stake';
import { nftMockList } from '@/core/utils/mock-nfts';

type NFTsSSRParams = {
  address: `0x${string}` | undefined;
};

export async function getNFTs({ address }: NFTsSSRParams): Promise<INFT[]> {
  const [mintRes, stakeRes] = await Promise.all([
    graphQLClient.request<{ mints: { items: IMint[] } }>(queryMint),
    graphQLClient.request<{ stakes: { items: IStake[] } }>(queryStake),
  ]);

  const mints = mintRes?.mints?.items || [];
  const stakes = stakeRes?.stakes?.items || [];

  const mapped = nftMockList
    .map((nft) => {
      const minted = mints.find(({ tokenId }) => tokenId === nft.id);
      const isOwner =
        stakes.find(({ tokenId }) => tokenId === nft.id)?.owner === address ||
        minted?.owner === address;
      const staked = stakes.find(({ tokenId, active }) => tokenId === nft.id && active);

      let ownerDisplay = '-';

      if (minted && !isOwner) {
        ownerDisplay = `${minted.owner.slice(0, 6)}...${minted.owner.slice(-4)}`;
      }

      if (isOwner) {
        ownerDisplay = 'You';
      }

      let status: INFT['status'] = 'Mint';

      if (staked) {
        status = 'Staked';
      }

      if (minted && !staked) {
        status = 'Minted';
      }

      return {
        ...nft,
        status,
        owner: ownerDisplay,
      };
    })
    .sort((a, b) => b.owner.localeCompare(a.owner));

  return mapped;
}
