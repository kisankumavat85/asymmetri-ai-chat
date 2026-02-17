"use client";

import { createChat } from "@/actions/chats";
import Message from "@/components/message";
import { PromptInput } from "@/components/prompt-input";
import { SelectMessage } from "@/db/schema";
import { useChat } from "@ai-sdk/react";

type Props = {
  chatId?: string;
  initialMessages?: SelectMessage[];
};

export const Chat = (props: Props) => {
  const { chatId, initialMessages = [] } = props;

  const { messages, sendMessage, status } = useChat({
    messages: initialMessages.map((message) => ({
      id: String(message.id),
      role: message.role,
      parts: [{ type: "text", text: message.content }],
    })),
    onError: (error) => {
      console.log("Chat Error: ", error);
    },
  });

  console.log(status, messages);

  const handleSubmit = async (prompt: string) => {
    if (chatId) {
      sendMessage(
        { text: prompt },
        {
          body: {
            chatId,
          },
        },
      );
      return;
    }

    const result = await createChat({
      title: prompt.substring(0, 40),
    });

    if (result.success && result.data?.id) {
      history.replaceState(null, "", `/chat/${result.data.id}`);
      sendMessage(
        { text: prompt },
        {
          body: {
            chatId: result.data.id,
          },
        },
      );
    }
  };
  return (
    <div className="h-full grid grid-rows-[1fr_auto]">
      <div className="min-h-0 flex justify-center overflow-y-auto">
        <div className="w-full max-w-2xl">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl pb-4">
          <PromptInput onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
