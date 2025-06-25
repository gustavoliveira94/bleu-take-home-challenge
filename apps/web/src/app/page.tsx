import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getNFTs } from '@/core/ssr/home/getNFTs';
import { Home } from '@/presentation/views';
import { cookies } from 'next/headers';
import { createQueryClient } from '@/configs/request/queryClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const cookieStore = cookies();
  const address = ((await cookieStore).get('wallet')?.value as `0x${string}`) ?? null;

  const queryClient = createQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['nfts', address],
      queryFn: () => getNFTs({ address }),
    });
  } catch (error) {
    queryClient.setQueryData(['nfts'], []);
  }

  const dehydratedState = dehydrate(queryClient);

  queryClient.clear();

  return (
    <HydrationBoundary state={dehydratedState}>
      <Home address={address} />
    </HydrationBoundary>
  );
}
