import { useSession, signIn } from 'next-auth/react';
import TopBar from '../components/Topbar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LogoIcon } from '@/Icons/LogoIcon';

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status, router]);

  return (
    <div>
      <TopBar />
      <div className="justify-center h-screen flex flex-col items-center">
        <LogoIcon width={150} height={150} className='mb-6' />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-5">Welcome to AC Desk Reservation</h1>
          <button
            onClick={() => signIn('google')}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}