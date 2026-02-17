import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "..";
import { chats, InsertChat } from "../schema";

export const _getChat = async (chatId: string, userId: string) => {
  const [chat] = await db
    .select()
    .from(chats)
    .where(and(eq(chats.userId, userId), eq(chats.id, chatId)))
    .limit(1);

  return chat;
};

export const _getChats = async (userId: string) => {
  return await db.select().from(chats).where(eq(chats.userId, userId));
};

export const _createChat = async (payload: InsertChat) => {
  return await db.insert(chats).values([payload]).returning();
};
