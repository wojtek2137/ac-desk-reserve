// src/pages/login.tsx
import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={() => signIn('google')}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Login with Google
            </button>
        </div>
    );
}