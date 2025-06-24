import { Loader2 } from 'lucide-react';

import { useNFTs } from '@/core/hooks/use-nfts';
import type { INFT } from '@/core/interfaces/nft';

interface NFTsProps {
  children: ({ nfts }: { nfts: INFT[] }) => React.ReactNode;
  address: `0x${string}`;
}

export const NFTs: React.FC<NFTsProps> = ({ children, address }) => {
  const { nfts, loading } = useNFTs({ address });

  if (loading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center" data-testid="loading">
        <Loader2 color="#ff0420" className="w-12 h-12 animate-1 animate-spin" />
      </div>
    );
  }

  if (!nfts.length) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <p className="text-gray-500">No NFTs found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 pt-4 pb-10 [grid-template-columns:repeat(auto-fill,minmax(400px,1fr))] mx-auto">
      {children({ nfts })}
    </div>
  );
};
