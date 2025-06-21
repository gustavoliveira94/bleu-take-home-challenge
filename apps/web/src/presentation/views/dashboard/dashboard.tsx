'use client';

import { Pencil, Wallet } from 'lucide-react';

import { NFTs } from '@/presentation/components/nfts/nfts';
import { NFT } from '@/presentation/components/nft/nft';
import { useUserInformations } from '@/core/hooks/use-user-informations';

export const Dashboard: React.FC = () => {
  const { totalStaked, totalNFTs } = useUserInformations();

  return (
    <section className="w-full max-w-[1300px] mx-auto space-y-4">
      <div className="w-full pt-[24px]">
        <div className="flex items-center gap-[8px] mb-[12px] justify-center">
          <Wallet className="text-primary" />
          <h3 className="text-[18px]">MY INFORMATIONS</h3>
        </div>
        <div className="flex items-center justify-center gap-[24px]">
          <p className="text-[14px]">Total NFTs: {totalNFTs}</p>
          <p className="text-[14px]">Total NFTs Staked: {totalStaked}</p>
          <p className="text-[14px]">Total Rewards: 0</p>
        </div>
      </div>
      <div className="w-full pt-[24px]">
        <div className="flex items-center justify-center gap-[8px] mb-[12px]">
          <Pencil className="text-primary" />
          <h3 className="text-[18px]">MY NFTs</h3>
        </div>
        <NFTs>
          {({ nfts }) => {
            const filteredOwner = nfts.filter((nft) => nft.owner === 'You');

            return filteredOwner.map((nft) => {
              return (
                <NFT
                  key={nft.id}
                  id={nft.id}
                  collection={nft.collection}
                  image={nft.image}
                  name={nft.name}
                  status={nft.status}
                  rarity={nft.rarity}
                  owner={nft.owner}
                />
              );
            });
          }}
        </NFTs>
      </div>
    </section>
  );
};
