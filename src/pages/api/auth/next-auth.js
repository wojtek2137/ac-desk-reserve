// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '../../../server/db';
import { providers } from 'next-auth';

export default NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});