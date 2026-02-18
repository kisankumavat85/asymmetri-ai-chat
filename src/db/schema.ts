import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";
import { timestamps } from "./column-helpers";
import { ChatMessage } from "@/app/api/chat/route";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const chats = pgTable("chats", {
  id: uuid().defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text().notNull(),
  ...timestamps,
});

export type SelectChat = typeof chats.$inferSelect;
export type InsertChat = typeof chats.$inferInsert;

export const roleEnum = pgEnum("role", ["system", "user", "assistant"]);

export const messages = pgTable("messages", {
  id: uuid().defaultRandom().primaryKey(),
  chatId: uuid("chat_id")
    .references(() => chats.id, { onDelete: "cascade" })
    .notNull(),
  role: roleEnum().notNull(),
  parts: jsonb("parts").$type<ChatMessage["parts"]>().notNull().default([]),
  createdAt: timestamps.createdAt,
});

export type SelectMessage = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;
