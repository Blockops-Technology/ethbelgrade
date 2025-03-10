import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import authConfig from "./auth.config";
import client from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  ...authConfig,
  callbacks: {
    signIn({ user }) {
      return user.email.endsWith("@ethbelgrade.rs") || user.email.endsWith("@unusualsour.com")
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth.user
    },
  },
})