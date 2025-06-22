'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { useToast } from '../hooks/use-toast';

export const withPrivatePage = (Component: React.FC) => {
  return () => {
    const hasRedirected = useRef(false);

    const { toast } = useToast();

    const { push } = useRouter();
    const { status } = useAccount();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (status === 'disconnected' && !hasRedirected.current) {
        hasRedirected.current = true;
        toast({ message: 'You must connect your wallet to access this page.', type: 'error' });
        push('/');

        return;
      }

      setLoading(false);
    }, [status]);

    if (loading) {
      return (
        <div className="w-full h-[500px] flex items-center justify-center">
          <Loader2 color="#ff0420" className="w-12 h-12 animate-1 animate-spin" />
        </div>
      );
    }

    return <Component />;
  };
};
