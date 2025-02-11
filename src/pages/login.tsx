// src/pages/login.js

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

export default function Login() {
  const { data: session } = useSession();
console.log('session',session);
  return (
    <div>
      {!session ? (
        <>
          <p>You are not signed in</p>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </>
      ) : (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
