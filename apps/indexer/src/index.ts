import { ponder } from 'ponder:registry';
import { transfer } from '../ponder.schema';

ponder.on("bleuNFT:Transfer", async ({ context, event }) => {
  const { db } = context;

  await db.insert(transfer).values({
    tokenId: Number(event.args.tokenId),
    from: event.args.from,
    to: event.args.to
  })
});
