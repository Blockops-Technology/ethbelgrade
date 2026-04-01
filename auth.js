import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import authConfig from "./auth.config";
import client from "@/lib/db";
import connectMongo from "@/lib/mongoose";
import Moderator from "@/models/Moderator";

export const DEV_AUTH_BYPASS = process.env.DEV_AUTH_BYPASS === "true";

export const getDevSession = () => ({
  user: {
    name: "Local Admin",
    email: "dev@ethbelgrade.rs",
  },
});

const ALLOWED_DOMAINS = ["ethbelgrade.rs", "unusualsour.com", "mmlado.com"];

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const isAllowedDomain = (email = "") =>
  ALLOWED_DOMAINS.some((domain) => normalizeEmail(email).endsWith(`@${domain}`));

const isModerator = async (email = "") => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return false;
  }

  await connectMongo();
  const moderator = await Moderator.findOne({ email: normalizedEmail });
  return Boolean(moderator);
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      const email = normalizeEmail(user?.email);

      if (isAllowedDomain(email)) {
        return true;
      }

      try {
        return await isModerator(email);
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth.user
    },
  },
})
