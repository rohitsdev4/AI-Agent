'use client';

import { useState, useEffect } from 'react';
import PasswordProtect from '@/components/PasswordProtect';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check sessionStorage to see if the user is already authenticated.
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('dashboard-authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      router.push('/dashboard');
    }
  }, [router]);

  const handleSuccess = () => {
    sessionStorage.setItem('dashboard-authenticated', 'true');
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  // If we're not authenticated (and the effect hasn't redirected us), show the password form.
  // We avoid a flash of the password form if already authenticated by checking the state.
  if (!isAuthenticated) {
    return <PasswordProtect onSuccess={handleSuccess} />;
  }

  // This will be shown briefly during redirection, or if redirection fails.
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
