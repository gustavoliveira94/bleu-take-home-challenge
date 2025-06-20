import { ponder } from 'ponder:registry';
import { mint } from '../ponder.schema';

ponder.on("bleuNFT:Mint", async ({ context, event }) => {
  const { db } = context;

  await db.insert(mint).values({
    tokenId: Number(event.args.tokenId),
    owner: event.args.to
  })
});
