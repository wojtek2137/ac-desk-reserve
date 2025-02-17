import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function TopBar() {
  const { data: session } = useSession();
  const { isMobile } = useBreakpoint();

  return (
    <div className="z-40 w-full fixed top-0 left-0 bg-[#004CFF] p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-2">
        <svg width="56" height="56" viewBox="0 0 306 306" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="153" cy="153" r="110" fill="white"/>
          <path d="M190.319 152.752L125.953 195.497C122.971 197.485 121.479 200.715 121.479 203.946V214.632L199.514 163.438C202.993 160.953 205.23 156.976 205.23 152.752C205.23 148.527 203.242 144.55 199.514 142.065L121.479 91.3677V101.308C121.479 104.788 123.219 108.018 125.953 109.758L190.319 152.752Z" fill="black"/>
          <path d="M151.55 156.231C155.029 158.467 159.503 158.467 162.982 156.231L168.449 152.503L127.692 124.918C125.207 123.178 121.479 124.918 121.479 128.148V136.349L142.603 150.515L151.55 156.231Z" fill="black"/>
        </svg>

        <span className={`text-white ${isMobile ? 'text-lg' : 'text-2xl'} font-bold font-sans hover:text-gray-200 transition duration-300`}>
          AC Desk Reservation
        </span>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-white hover:border-gray-200 transition duration-300"
              />
            )}
            {!isMobile && (
              <span className="text-white font-medium hover:text-gray-200 transition duration-300">
                Hello, {session.user?.name}
              </span>
            )}
            <button
              onClick={() => signOut()}
              className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg ${
                isMobile ? 'px-3 py-2' : ''
              }`}
            >
              {isMobile ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
              ) : 'Logout'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className={`px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg flex items-center gap-2 ${
              isMobile ? 'px-3' : ''
            }`}
          >
            {isMobile ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
              </svg>
            ) : 'Login with Google'}
          </button>
        )}
      </div>
    </div>
  );
}
