"use server";

import { auth } from "@/auth";
import {
  _createChat,
  _getChat,
  _getChats,
  GetChatsParams,
} from "@/db/dal/chats";
import { InsertChat } from "@/db/schema";
import { revalidatePath } from "next/cache";

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

export const getChats = async (params: Omit<GetChatsParams, "userId">) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const chats = await _getChats({ ...params, userId: session.user.id });
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
    revalidatePath("/chat", "layout");
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
