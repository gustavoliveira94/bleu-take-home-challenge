import { getTransactions } from '@/core/ssr/transactions/getTransactions';
import { Transactions } from '@/presentation/views';

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return <Transactions transactions={transactions} />;
}
