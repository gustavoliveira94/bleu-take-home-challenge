import { NotepadTextIcon } from 'lucide-react';

import { Table } from '@/presentation/components/table/table';

interface TransactionsProps {
  transactions: {
    stakes: (string | number)[][];
    mints: (string | number)[][];
    unstake: (string | number)[][];
  };
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const { stakes, mints, unstake } = transactions;

  return (
    <section className="w-full max-w-[1300px] mx-auto space-y-4">
      <div className="flex gap-4">
        <div className="w-full pt-[24px]">
          <div className="flex items-center gap-[8px] mb-[12px] justify-center">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-[14px]">MINTS</h3>
          </div>
          <Table columns={['Token ID', 'Owner', 'Minted At']} rows={mints} />
        </div>
        <div className="w-full pt-[24px]">
          <div className="flex items-center gap-[8px] mb-[12px] justify-center">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-[14px]">STAKES</h3>
          </div>
          <Table columns={['Token ID', 'Owner', 'Staked At']} rows={stakes} />
        </div>
        <div className="w-full pt-[24px]">
          <div className="flex items-center gap-[8px] mb-[12px] justify-center">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-[14px]">UNSTAKES</h3>
          </div>
          <Table columns={['Token ID', 'Owner', 'Unstaked At']} rows={unstake} />
        </div>
      </div>
    </section>
  );
};
