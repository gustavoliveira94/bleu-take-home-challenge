import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { useAccount } from 'wagmi';
import type { IMint } from '../interfaces/mint';
import type { INFT } from '../interfaces/nft';
import { nftMockList } from '../utils/mock-nfts';
import { IStake } from '../interfaces/stake';
import { queryMint } from '../queries/mint';
import { queryStake } from '../queries/stake';

export const useNFTs = () => {
  const { address } = useAccount();

  const { data: mints, isLoading: mintLoading } = useQuery<{ mints: { items: IMint[] } }>({
    queryKey: ['mints'],
    queryFn: () =>
      request(
        'http://localhost:42069',
        `
      ${queryMint}
    `
      ),
  });

  const { data: stakes, isLoading: stakeLoading } = useQuery<{ stakes: { items: IStake[] } }>({
    queryKey: ['stakes'],
    queryFn: () =>
      request(
        'http://localhost:42069',
        `
      ${queryStake}
    `
      ),
  });

  const mapNFTs = (): INFT[] => {
    return nftMockList.map((nft) => {
      const isMinted = mints?.mints?.items.find(({ tokenId }) => tokenId === nft.id);
      const isOwner = isMinted?.owner === address;
      const staked = stakes?.stakes?.items.find(
        ({ tokenId, owner, active }) => tokenId === nft.id && owner === address && active
      );

      let owner = '-';

      if (isMinted) {
        owner = `${isMinted?.owner.slice(0, 6)}...${isMinted?.owner.slice(-4)}`;
      }

      if (isOwner) {
        owner = 'You';
      }

      let status: 'Minted' | 'Mint' | 'Staked' = 'Mint';

      if (isMinted) {
        status = 'Minted';
      }

      if (staked) {
        status = 'Staked';
      }

      return {
        ...nft,
        status,
        owner,
      };
    });
  };

  return {
    nfts: mapNFTs(),
    loading: mintLoading || stakeLoading,
  };
};
