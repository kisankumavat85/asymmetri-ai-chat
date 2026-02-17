import "server-only";
import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertMessage, messages } from "../schema";

// TODO: Add pagination
export const _getMessages = async (chatId: string) => {
  return await db.select().from(messages).where(eq(messages.chatId, chatId));
};

export const _createMessage = async (payload: InsertMessage) => {
  return await db.insert(messages).values([payload]).returning();
};
