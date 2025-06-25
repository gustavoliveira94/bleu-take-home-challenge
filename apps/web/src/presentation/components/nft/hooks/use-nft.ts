import { useMint } from '@/core/hooks/use-mint';
import { useStake } from '@/core/hooks/use-stake';
import { INFT } from '@/core/interfaces/nft';

interface IUseNFT {
  status: INFT['status'];
}

export const useNFT = ({ status }: IUseNFT) => {
  const { stake, unStake, loading: stakeLoading } = useStake();
  const { mint, loading: mintLoading } = useMint();

  const actions = {
    Minted: {
      action: stake,
      label: stakeLoading ? 'Staking...' : 'Stake',
    },
    Staked: {
      action: unStake,
      label: stakeLoading ? 'Unstaking...' : 'Unstake',
    },
    Mint: {
      action: mint,
      label: mintLoading ? 'Minting...' : 'Mint',
    },
  };

  const isFetching = stakeLoading || mintLoading;

  return {
    actions: actions[status as keyof typeof actions],
    isFetching,
  };
};
