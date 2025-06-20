import { onchainTable } from 'ponder';

export const transfer = onchainTable('Transfer', (t) => ({
  from: t.text(),
  to: t.text(),
  tokenId: t.integer().primaryKey()
}));
