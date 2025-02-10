// src/components/TopBar.tsx
import { useSession, signIn, signOut } from 'next-auth/react';

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <div className="w-full bg-gradient-to-r from-purple-600 to-blue-500 p-4 flex justify-between items-center shadow-lg">
      {/* App Name on the left */}
      <span className="text-white text-2xl font-bold font-sans hover:text-gray-200 transition duration-300">
        AC Desk Reservation
      </span>

      {/* User session controls on the right */}
      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="User avatar"
                className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-200 transition duration-300"
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