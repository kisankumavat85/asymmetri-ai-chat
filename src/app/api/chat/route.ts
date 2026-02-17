import { streamText, UIMessage, convertToModelMessages } from "ai";
import { openai } from "@/lib/ai";
import { auth } from "@/auth";
import { _getChat } from "@/db/dal/chats";
import { _createMessage } from "@/db/dal/messages";

type Payload = {
  messages: UIMessage[];
  userId: string;
  chatId: string;
  resourceId: number;
};

export const POST = async (request: Request) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const { messages, chatId }: Payload = await request.json();

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
      content: userMessage,
    });

    const result = streamText({
      model: openai("gpt-4o"),
      system: "", // TODO: Add system prompt
      messages: await convertToModelMessages(messages),
      onFinish: async ({ text, toolCalls }) => {
        await _createMessage({
          chatId,
          role: "assistant",
          content: text,
          toolInvocations: toolCalls,
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat Error: ", error);
    return Response.json({
      error: true,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
