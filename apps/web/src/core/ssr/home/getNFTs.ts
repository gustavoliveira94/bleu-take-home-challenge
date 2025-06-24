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
      const staked = stakes.find(
        ({ tokenId, owner, active }) => tokenId === nft.id && owner === address && active
      );

      let ownerDisplay = '-';
      if (minted) {
        ownerDisplay = `${minted.owner.slice(0, 6)}...${minted.owner.slice(-4)}`;
      }

      if (minted?.owner === address) {
        ownerDisplay = 'You';
      }

      let status: 'Mint' | 'Minted' | 'Staked' = 'Mint';

      if (minted) status = 'Minted';

      if (staked) status = 'Staked';

      return {
        ...nft,
        status,
        owner: ownerDisplay,
      };
    })
    .sort((a, b) => b.owner.localeCompare(a.owner));

  return mapped;
}
