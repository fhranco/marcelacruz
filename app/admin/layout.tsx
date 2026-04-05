'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    const auth = localStorage.getItem('ma_admin_auth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-black/20 mb-4" size={24} />
        <span className="text-[10px] uppercase tracking-widest font-bold text-black/40">Verificando Credenciales...</span>
      </div>
    );
  }

  return <>{children}</>;
}
