"use server";

import { auth } from "@/auth";
import { _createChat, _getChat, _getChats } from "@/db/dal/chats";
import { InsertChat } from "@/db/schema";

export const getChat = async (chatId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const chats = await _getChat(chatId, session.user.id);
    return {
      success: true,
      data: chats,
    };
  } catch (error) {
    console.error("Failed to get chats", error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
};

export const getChats = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const chats = await _getChats(session.user.id);
    return {
      success: true,
      data: chats,
    };
  } catch (error) {
    console.error("Failed to get chats", error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
};

export const createChat = async (payload: Omit<InsertChat, "userId">) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const [chat] = await _createChat({ ...payload, userId: session.user.id });
    return {
      success: true,
      data: chat,
    };
  } catch (error) {
    console.error("Failed to create chat", error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
};
