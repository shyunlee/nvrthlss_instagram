import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import type { Provider } from 'next-auth/providers'
import Google from "next-auth/providers/google"

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
    async session({session}) {
      const user = session?.user;
      if (user) {
        session.user={
          ...user,
          username: user.email?.split('@')[0] || '',
        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
})