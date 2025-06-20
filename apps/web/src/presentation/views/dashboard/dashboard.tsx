'use client';

import { Pencil, Wallet } from 'lucide-react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { abi as stakerAbi } from '@/core/utils/abis/BleuNFTStaker.json';
import abi from '@/core/utils/abis/bleuNFT.json';

import { useNFTs } from '@/core/hooks/useNFTs';

export const Dashboard: React.FC = () => {
  useNFTs();

  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data } = useReadContract({
    abi: [abi.abi?.[7]],
    functionName: 'ownerOf',
    address: '0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25',
    args: [0],
    query: {
      enabled: !!address,
    },
  });

  const handleMint = async () => {
    console.log('Minting NFT');
    await writeContractAsync({
      address: '0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25',
      abi: [abi.abi?.[5]],
      functionName: 'mint',
      args: [],
    });
  };

  const handleStake = async () => {
    console.log('Staking NFT');
    await writeContractAsync({
      address: '0xBEc49fA140aCaA83533fB00A2BB19bDdd0290f25',
      abi: [abi.abi[1]],
      functionName: 'approve',
      args: ['0xD84379CEae14AA33C123Af12424A37803F885889', BigInt(0)],
    });

    await writeContractAsync({
      address: '0xD84379CEae14AA33C123Af12424A37803F885889',
      abi: [stakerAbi[11]],
      functionName: 'stake',
      args: [BigInt(0)],
    });
  };

  return (
    <section className="w-full max-w-[1300px] mx-auto space-y-4">
      <div className="w-full pt-[24px]">
        <div className="flex items-center gap-[8px] mb-[12px] justify-center">
          <Wallet className="text-primary" />
          <h3 className="text-[18px]">MY INFORMATIONS</h3>
        </div>
        <div className="flex items-center justify-center gap-[24px]">
          <p className="text-[14px]">Total NFTs: 0</p>
          <p className="text-[14px]">Total NFTs Staked: 0</p>
          <p className="text-[14px]">Total Rewards: 0</p>
        </div>
      </div>
      <div className="w-full pt-[24px]">
        <div className="flex items-center justify-center gap-[8px] mb-[12px]">
          <Pencil className="text-primary" />
          <h3 className="text-[18px]">MY NFTs</h3>
        </div>
      </div>
    </section>
  );
};
