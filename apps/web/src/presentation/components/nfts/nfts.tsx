'use client';

import { useNFTs } from '@/core/hooks/use-nfts';
import type { INFT } from '@/core/interfaces/nft';
import { Loader2 } from 'lucide-react';

interface NFTsProps {
  children: ({ nfts }: { nfts: INFT[] }) => React.ReactNode;
}

export const NFTs: React.FC<NFTsProps> = ({ children }) => {
  const { nfts, loading } = useNFTs();

  if (loading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
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
    <div className="grid gap-4 pt-4 pb-10 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
      {children({ nfts })}
    </div>
  );
};
