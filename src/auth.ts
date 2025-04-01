import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import type { Provider } from 'next-auth/providers'
import Google from "next-auth/providers/google"
import { addNewUser } from "./service/sanity/user"

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
  }),
  Google,
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    async signIn({user, profile}) {
      if (!user.email || !profile?.sub) {
        return false;
      }
      addNewUser({
        id: profile.sub,
        email: user.email,
        name: user.name || '',
        username: user.email.split('@')[0],
        image: user.image || ''
      })
      return true;
    },
    async session({session, token}) {
      const user = session?.user;
      if (user) {
        session.user={
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string
        }
      }
      return session;
    },
    async jwt({token, user}) {
      if (user) {
        token.id = user.id
      }
      return token;
    }

  },
  pages: {
    signIn: '/auth/signin'
  }
})