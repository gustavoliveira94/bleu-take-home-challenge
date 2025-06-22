'use client';

import { NotepadTextIcon } from 'lucide-react';

import { useTransactions } from '@/core/hooks/use-transactions';
import { Table } from '@/presentation/components/table/table';

export const Transactions: React.FC = () => {
  const { stakes, mints, unstake, loadingMints, loadingStakes, loadingUnstake } = useTransactions();

  return (
    <section className="w-full max-w-[1300px] mx-auto space-y-4">
      <div className="flex gap-4">
        <div className="w-full pt-[24px]">
          <div className="flex items-center gap-[8px] mb-[12px] justify-center">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-[14px]">MINTS</h3>
          </div>
          <Table columns={['Token ID', 'Owner', 'Minted At']} rows={mints} loading={loadingMints} />
        </div>
        <div className="w-full pt-[24px]">
          <div className="flex items-center gap-[8px] mb-[12px] justify-center">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-[14px]">STAKES</h3>
          </div>
          <Table
            columns={['Token ID', 'Owner', 'Staked At']}
            rows={stakes}
            loading={loadingStakes}
          />
        </div>
        <div className="w-full pt-[24px]">
          <div className="flex items-center gap-[8px] mb-[12px] justify-center">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-[14px]">UNSTAKES</h3>
          </div>
          <Table
            columns={['Token ID', 'Owner', 'Unstaked At']}
            rows={unstake}
            loading={loadingUnstake}
          />
        </div>
      </div>
    </section>
  );
};
