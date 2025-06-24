'use client';

import { NFT } from '@/presentation/components/nft/nft';
import { NFTs } from '@/presentation/components/nfts/nfts';

interface HomeProps {
  address: `0x${string}`;
}

export const Home: React.FC<HomeProps> = ({ address }) => {
  return (
    <section className="w-full max-w-[1300px] mx-auto space-y-4 pt-10 pb-10">
      <NFTs address={address}>
        {({ nfts }) => {
          return nfts?.map((nft) => (
            <NFT
              key={nft.id}
              collection={nft.collection}
              id={nft.id}
              name={nft.name}
              image={nft.image}
              status={nft.status}
              owner={nft.owner}
            />
          ));
        }}
      </NFTs>
    </section>
  );
};
