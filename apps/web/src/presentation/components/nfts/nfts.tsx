import { nftMockList } from './utils/mock-nfts';

interface NFTsProps {
  children: ({ nfts }: { nfts: typeof nftMockList }) => React.ReactNode;
}

export const NFTs: React.FC<NFTsProps> = ({ children }) => {
  return <div className="grid grid-cols-3 gap-4">{children({ nfts: nftMockList })}</div>;
};
