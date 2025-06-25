import { getTransactions } from '@/core/ssr/transactions/getTransactions';
import { Transactions } from '@/presentation/views';

export default async function TransactionsPage() {
  let transactions;

  try {
    transactions = await getTransactions();
  } catch (error) {
    transactions = {
      mints: [],
      stakes: [],
      unstake: [],
    };
  }

  return <Transactions transactions={transactions} />;
}
