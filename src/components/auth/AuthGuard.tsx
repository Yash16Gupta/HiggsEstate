
"use client";

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Store the attempted path to redirect back after login
      const currentPath = pathname === '/login' ? '/agent/list-property' : pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, loading, router, pathname]);

  if (loading || (!user && pathname !== '/login')) { // Allow /login page to render its own content
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Authenticating...</p>
      </div>
    );
  }

  return <>{children}</>;
}
