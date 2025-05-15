import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import { writeClient } from "@/sanity/lib/write-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'github') {
          const existingUser = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: profile?.id,
            });

          if (!existingUser) {
            await writeClient.create({
              _type: "author",
              id: profile?.id,
              name: user.name,
              username: profile?.login,
              email: user.email,
              image: user.image,
              bio: profile?.bio || "",
            });
          }
        } else if (account?.provider === 'google') {
          // For Google users, we'll use their email as the identifier
          const existingUser = await client
            .withConfig({ useCdn: false })
            .fetch('*[_type == "author" && email == $email][0]', {
              email: user.email,
            });

          if (!existingUser) {
            await writeClient.create({
              _type: "author",
              id: user.email?.replace(/[^a-zA-Z0-9]/g, '_'),
              name: user.name,
              email: user.email,
              image: user.image,
              bio: profile?.bio || "",
            });
          }
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        let user;
        if (account.provider === 'github') {
          user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: profile?.id,
            });
        } else if (account.provider === 'google') {
          user = await client
            .withConfig({ useCdn: false })
            .fetch('*[_type == "author" && email == $email][0]', {
              email: profile?.email,
            });
        }
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
})