import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LogoIcon } from '@/Icons/LogoIcon';
import Link from 'next/link';

export default function ErrorPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status, router]);

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-[#004CFF] text-white'>
      <div className='flex flex-col items-center'>
        <LogoIcon className='mb-6' />
        <h1 className='text-3xl font-bold mb-4'>Access Denied</h1>
        <p className='text-lg mb-6 text-center'>
          Please login via <strong>@activecampaign.com</strong>
        </p>
        <Link
          href='/api/auth/signin'
          className='px-6 py-3 bg-white text-[#004CFF] font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg'
        >
          Try again
        </Link>
      </div>
    </div>
  );
}
