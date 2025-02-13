import { useSession, signIn } from 'next-auth/react';
import TopBar from '../components/Topbar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
      <div className="mt-10 flex flex-col  items-center h-screen">
          <svg width="150" height="150" viewBox="0 0 306 306" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="153" cy="153" r="110" fill="white"/>
            <path d="M190.319 152.752L125.953 195.497C122.971 197.485 121.479 200.715 121.479 203.946V214.632L199.514 163.438C202.993 160.953 205.23 156.976 205.23 152.752C205.23 148.527 203.242 144.55 199.514 142.065L121.479 91.3677V101.308C121.479 104.788 123.219 108.018 125.953 109.758L190.319 152.752Z" fill="black"/>
            <path d="M151.55 156.231C155.029 158.467 159.503 158.467 162.982 156.231L168.449 152.503L127.692 124.918C125.207 123.178 121.479 124.918 121.479 128.148V136.349L142.603 150.515L151.55 156.231Z" fill="black"/>
          </svg>
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