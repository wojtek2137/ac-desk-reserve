// src/components/TopBar.tsx
import { useSession, signIn, signOut } from 'next-auth/react';

export default function TopBar() {
  const { data: session } = useSession();

  return (
    <div className="w-full bg-gray-100 p-4 flex justify-end items-center gap-4">
      {session ? (
        <div className="flex items-center gap-3">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
          )}
          <span>Hello, {session.user?.name}</span>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Login with GitHub
        </button>
      )}
    </div>
  );
}