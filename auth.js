import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import authConfig from "./auth.config";
import client from "@/lib/db";

export const DEV_AUTH_BYPASS = process.env.DEV_AUTH_BYPASS === "true";

export const getDevSession = () => ({
  user: {
    name: "Local Admin",
    email: "dev@ethbelgrade.rs",
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  ...authConfig,
  callbacks: {
    signIn({ user }) {
      return user.email.endsWith("@ethbelgrade.rs") || user.email.endsWith("@unusualsour.com") || user.email.endsWith("@mmlado.com")
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth.user
    },
  },
})
