import "server-only";
import { and, asc, desc, eq, ilike } from "drizzle-orm";
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

export type GetChatsParams = {
  userId: string;
  limit?: number;
  page?: number;
  sort?: "asc" | "desc";
  query?: string;
};

export const _getChats = async (params: GetChatsParams) => {
  const { userId, limit = 20, page = 1, query, sort = 'desc' } = params;
  const offset = (page - 1) * limit;

  const whereClause = query
    ? and(eq(chats.userId, userId), ilike(chats.title, `%${query}%`))
    : eq(chats.userId, userId);

  const orderByClause =
    sort === "desc" ? desc(chats.updatedAt) : asc(chats.updatedAt);

  return await db
    .select()
    .from(chats)
    .where(whereClause)
    .orderBy(orderByClause)
    .limit(limit)
    .offset(offset);
};

export const _createChat = async (payload: InsertChat) => {
  return await db.insert(chats).values([payload]).returning();
};
