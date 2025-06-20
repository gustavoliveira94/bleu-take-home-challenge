'use client';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { abi as stakerAbi } from '@/core/lib/abis/BleuNFTStaker.json';
import abi from '@/core/lib/abis/bleuNFT.json';

export const Home: React.FC = () => {
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
    <div>
      <h1>Home</h1>

      <button className="cursor-pointer" type="button" onClick={() => handleMint()}>
        Mint NFT
      </button>
      <button className="cursor-pointer" type="button" onClick={() => handleStake()}>
        Stake NFT
      </button>

      <section className="w-full max-w-3xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-foreground">NFT Activity History</h2>
        </div>

        {/* List Item - Example NFT - Staked */}
        <div className="flex items-center justify-between bg-success/10 border-l-4 border-success p-4 rounded-lg">
          <div className="flex items-center gap-4">
            {/* Placeholder NFT thumbnail */}
            <div className="w-16 h-16 bg-content rounded-md flex items-center justify-center">
              <span className="text-content-foreground/70 text-sm">#123</span>
            </div>
            <div>
              <p className="text-foreground font-medium">Cool NFT #123</p>
              <p className="text-foreground/60 text-sm">Staked on Jun 20, 2025</p>
            </div>
          </div>
          <span className="text-success font-semibold text-sm">Staked</span>
        </div>

        {/* List Item - Example NFT - Unstaked */}
        <div className="flex items-center justify-between bg-important/10 border-l-4 border-important p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-content rounded-md flex items-center justify-center">
              <span className="text-content-foreground/70 text-sm">#042</span>
            </div>
            <div>
              <p className="text-foreground font-medium">Cool NFT #042</p>
              <p className="text-foreground/60 text-sm">Unstaked on Jun 18, 2025</p>
            </div>
          </div>
          <span className="text-important font-semibold text-sm">Unstaked</span>
        </div>

        {/* Example - Error/Failed transaction */}
        <div className="flex items-center justify-between bg-error/10 border-l-4 border-error p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-content rounded-md flex items-center justify-center">
              <span className="text-content-foreground/70 text-sm">#999</span>
            </div>
            <div>
              <p className="text-foreground font-medium">Cool NFT #999</p>
              <p className="text-foreground/60 text-sm">Failed to stake on Jun 15</p>
            </div>
          </div>
          <span className="text-error font-semibold text-sm">Failed</span>
        </div>
      </section>
    </div>
  );
};
