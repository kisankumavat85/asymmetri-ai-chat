import {
  streamText,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
  UIDataTypes,
} from "ai";
import { openai } from "@/lib/ai";
import { auth } from "@/auth";
import { _getChat } from "@/db/dal/chats";
import { _createMessage } from "@/db/dal/messages";
import { ChatUITools, tools } from "@/lib/ai/tools";

export type ChatMessage = UIMessage<never, UIDataTypes, ChatUITools>;

type Payload = {
  messages: ChatMessage[];
  chatId: string;
};

export const maxDuration = 30;

export const POST = async (request: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const { messages, chatId }: Payload = await request.json();

    console.log("messages >>>", messages);

    if (!userId) {
      return Response.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!chatId) {
      return Response.json({ error: "chatId is required" }, { status: 400 });
    }

    const chat = await _getChat(chatId, userId);

    if (!chat) {
      return Response.json({ error: "Chat not found" }, { status: 404 });
    }

    // Create user message: with chat content, tool invocation, role and chat id
    const lastMessage = messages[messages.length - 1];
    let userMessage = "";

    if (lastMessage.role === "user") {
      const messageText = lastMessage.parts.find((p) => p.type === "text");
      if (messageText) {
        userMessage = messageText.text;
      }
    }

    if (!userMessage) {
      throw new Error("User message not found");
    }

    await _createMessage({
      chatId,
      role: lastMessage.role,
      parts: lastMessage.parts,
    });

    const result = streamText({
      model: openai("gpt-4o"),
      system: "You are a helpful assistant",
      messages: await convertToModelMessages(messages),
      tools,
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onFinish: async ({ responseMessage }) => {
        console.log("responseMessage:", responseMessage);
        // console.log("2.", JSON.stringify(messages));

        // for (const message of messages) {
        await _createMessage({
          chatId,
          role: responseMessage.role,
          parts: responseMessage.parts,
        });
        // }
      },
    });
  } catch (error) {
    console.error("Chat Error: ", error);
    return Response.json({
      error: true,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
