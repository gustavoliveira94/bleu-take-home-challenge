import { onchainTable } from 'ponder';

export const mint = onchainTable('Mint', (t) => ({
  owner: t.text(),
  tokenId: t.integer().primaryKey(),
}));

export const stake = onchainTable('Stake', (t) => ({
  owner: t.text(),
  tokenId: t.integer().primaryKey(),
  active: t.boolean(),
}));

export const allStake = onchainTable('AllStake', (t) => ({
  id: t.text().primaryKey(),
  owner: t.text(),
  tokenId: t.integer(),
}));

export const unstake = onchainTable('Unstake', (t) => ({
  id: t.text().primaryKey(),
  owner: t.text(),
  tokenId: t.integer(),
}));