import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <div className="w-full bg-black p-4 flex justify-between items-center shadow-lg relative">
      <div className="flex items-center gap-2">
        <svg width="56" height="56" viewBox="0 0 306 306" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="153" cy="153" r="110" fill="white"/>
          <path d="M190.319 152.752L125.953 195.497C122.971 197.485 121.479 200.715 121.479 203.946V214.632L199.514 163.438C202.993 160.953 205.23 156.976 205.23 152.752C205.23 148.527 203.242 144.55 199.514 142.065L121.479 91.3677V101.308C121.479 104.788 123.219 108.018 125.953 109.758L190.319 152.752Z" fill="black"/>
          <path d="M151.55 156.231C155.029 158.467 159.503 158.467 162.982 156.231L168.449 152.503L127.692 124.918C125.207 123.178 121.479 124.918 121.479 128.148V136.349L142.603 150.515L151.55 156.231Z" fill="black"/>
        </svg>

        <span className="text-white text-2xl font-bold font-sans hover:text-gray-200 transition duration-300">
          AC Desk Reservation
        </span>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-white hover:border-gray-200 transition duration-300"
              />
            )}
            <span className="text-white font-medium hover:text-gray-200 transition duration-300">
              Hello, {session.user?.name}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md hover:shadow-lg"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}
