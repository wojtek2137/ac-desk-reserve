import NextAuth, { User } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User}) {
      if (user.email?.endsWith("@activecampaign.com")) {
        return true; 
      }
      return false; 
    },
  },
  pages: {
    error: "/auth/error", 
  },
}

export default NextAuth(authOptions)
 