import { onchainTable } from 'ponder';

export const mint = onchainTable('Mint', (t) => ({
  owner: t.text(),
  tokenId: t.integer().primaryKey()
}));
