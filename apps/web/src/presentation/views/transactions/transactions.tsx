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
    <section className="w-full max-w-[1300px] mx-auto space-y-4 px-4">
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full pt-6">
          <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-sm">MINTS</h3>
          </div>
          <div className="overflow-auto">
            <Table columns={['Token ID', 'Owner', 'Minted At']} rows={mints} />
          </div>
        </div>

        <div className="w-full pt-6">
          <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-sm">STAKES</h3>
          </div>
          <div className="overflow-auto">
            <Table columns={['Token ID', 'Owner', 'Staked At']} rows={stakes} />
          </div>
        </div>

        <div className="w-full pt-6">
          <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
            <NotepadTextIcon className="text-primary" />
            <h3 className="text-sm">UNSTAKES</h3>
          </div>
          <div className="overflow-auto">
            <Table columns={['Token ID', 'Owner', 'Unstaked At']} rows={unstake} />
          </div>
        </div>
      </div>
    </section>
  );
};
