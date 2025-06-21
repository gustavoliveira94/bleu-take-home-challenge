import { ponder } from 'ponder:registry';
import { allStake, mint, stake, unstake } from '../ponder.schema';

ponder.on("bleuNFT:Mint", async ({ context, event }) => {
  const { db } = context;

  await db.insert(mint).values({
    tokenId: Number(event.args.tokenId),
    owner: event.args.to,
    timestamp: event.block.timestamp
  })
});

ponder.on("bleuNFTStake:Stake", async ({ context, event }) => {
  const { db } = context;

    Promise.all([
      db.insert(stake).values({
        tokenId: Number(event.args.tokenId),
        owner: event.args.to,
        timestamp: event.block.timestamp,
      }).onConflictDoUpdate({
        active: true,
      }),
      db.insert(allStake).values({
        id: event.transaction.hash + event.args.tokenId.toString(),
        tokenId: Number(event.args.tokenId),
        owner: event.args.to,
        timestamp: event.block.timestamp,
      })
    ])
});

ponder.on("bleuNFTStake:Unstake", async ({ context, event }) => {
  const { db } = context;

  await Promise.all([
    db.insert(unstake).values({
      id: event.transaction.hash + event.args.tokenId.toString(),
      tokenId: Number(event.args.tokenId),
      owner: event.args.to,
      timestamp: event.block.timestamp
    }),
    db
      .update(stake, { tokenId: Number(event.args.tokenId) })
      .set({ active: false })
    ]);
});