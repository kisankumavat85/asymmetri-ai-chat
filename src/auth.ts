import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./db";
import { accounts, sessions, users } from "./db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: accounts,
    usersTable: users,
    sessionsTable: sessions,
  }),
  providers: [GitHub],
});
