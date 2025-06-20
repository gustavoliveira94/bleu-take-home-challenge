import { NFT } from '@/presentation/components/nft/nft';
import { NFTs } from '@/presentation/components/nfts/nfts';
import Image from 'next/image';
import { nftMockList } from '../../components/nfts/utils/mock-nfts';

export const Home: React.FC = () => {
  return (
    <section className="w-full max-w-[1300px] mx-auto space-y-4 pt-10 pb-10">
      <NFTs>
        {({ nfts }) => {
          return nfts.map((nft) => (
            <NFT
              key={nft.id}
              collection={nft.collection}
              id={nft.id}
              name={nft.name}
              image={nft.image}
            />
          ));
        }}
      </NFTs>
    </section>
  );
};
