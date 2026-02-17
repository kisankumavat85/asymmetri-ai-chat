"use server";

import { auth } from "@/auth";
import { _createMessage, _getMessages } from "@/db/dal/messages";
import { InsertMessage } from "@/db/schema";

export const getMessages = async (chatId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const messages = await _getMessages(chatId);
    return {
      success: true,
      data: messages,
    };
  } catch (error) {
    console.error("Failed to get messages", error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
};

export const createMessage = async (payload: InsertMessage) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }
    const [message] = await _createMessage(payload);
    return {
      success: true,
      data: message,
    };
  } catch (error) {
    console.error("Failed to create message", error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
};
