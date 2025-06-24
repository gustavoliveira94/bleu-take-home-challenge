'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useModal } from 'connectkit';

import type { INFT } from '@/core/interfaces/nft';

import { useNFT } from './hooks/use-nft';

export const NFT: React.FC<INFT> = memo(({ id, collection, image, name, status, owner }) => {
  const { setOpen } = useModal();
  const { status: statusWallet } = useAccount();
  const { actions } = useNFT({ status });

  const action = actions?.action;
  const label = actions?.label;

  const isAvailable = status === 'Mint' || owner === 'You';

  const actionButton = () =>
    statusWallet === 'disconnected' ? setOpen(true) : action({ tokenId: id });

  return (
    <div className="flex border rounded-lg w-full xl:w-[420px] relative">
      <Image
        src={image}
        alt={name}
        width={240}
        height={272}
        quality={100}
        className="object-cover"
      />
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
        <p>
          <b>Owner:</b> <br /> {owner}
        </p>
        <p>
          <b>Status:</b> <br /> {status}
        </p>
      </div>
      {isAvailable ? (
        <button
          type="button"
          className="absolute right-4 top-4 cursor-pointer bg-primary p-2 rounded-lg text-primary-foreground"
          onClick={() => actionButton()}
        >
          {label}
        </button>
      ) : null}
    </div>
  );
});
