'use client';

import Image from 'next/image';

import { useWriteContract } from '@/core/hooks/useWriteContract';
import { memo } from 'react';

interface NFTProps {
  id: number;
  name: string;
  collection: string;
  image: string;
}

export const NFT: React.FC<NFTProps> = memo(({ id, collection, image, name }) => {
  const { writeContract } = useWriteContract();

  return (
    <div className="flex border rounded-lg w-[400px] relative">
      <Image src={image} alt={name} width={180} height={100} />
      <div className="p-4">
        <p>
          <b>ID:</b> <br /> #{id}
        </p>
        <p>
          <b>Name:</b> <br /> {name}
        </p>
        <p>
          <b>Collection:</b> <br /> {collection}
        </p>
      </div>
      <button
        type="button"
        className="absolute right-4 top-4 cursor-pointer bg-success p-2 rounded-lg text-white"
        onClick={() => writeContract({ contract: 'mint', args: [], functionName: 'mint' })}
      >
        Mint
      </button>
    </div>
  );
});
