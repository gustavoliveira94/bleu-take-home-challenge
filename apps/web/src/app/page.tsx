import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getNFTs } from '@/core/ssr/home/getNFTs';
import { Home } from '@/presentation/views';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const cookieStore = cookies();
  const address = ((await cookieStore).get('wallet')?.value as `0x${string}`) ?? null;

  const queryClient = new QueryClient();

  await queryClient.ensureQueryData({
    queryKey: ['nfts', address],
    queryFn: () => getNFTs({ address }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Home address={address} />
    </HydrationBoundary>
  );
}
