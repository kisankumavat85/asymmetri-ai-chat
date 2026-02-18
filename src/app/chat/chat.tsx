"use client";

import { createChat } from "@/actions/chats";
import Message from "@/components/message";
import { PromptInput } from "@/components/prompt-input";
import { SelectMessage } from "@/db/schema";
import { useChat } from "@ai-sdk/react";
import { Loader } from "lucide-react";
import { ChatMessage } from "../api/chat/route";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  chatId?: string;
  initialMessages?: SelectMessage[];
};

export const Chat = (props: Props) => {
  const { chatId, initialMessages = [] } = props;
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { messages, sendMessage, status } = useChat<ChatMessage>({
    messages: initialMessages.map((message) => ({
      id: String(message.id),
      role: message.role,
      parts: [{ type: "text", text: message.content }],
    })),
    onError: (error) => {
      console.error("Chat Error: ", error);
    },
  });

  const isLoading = status === "submitted";

  const handleSubmit = async (prompt: string) => {
    if (chatId) {
      sendMessage({ text: prompt }, { body: { chatId } });
      return;
    }

    const result = await createChat({
      title: prompt.substring(0, 40),
    });

    router.refresh();

    if (result.success && result.data?.id) {
      history.replaceState(null, "", `/chat/${result.data.id}`);
      sendMessage({ text: prompt }, { body: { chatId: result.data.id } });
    }
  };

  const [lastUserMessageId, setLastUserMessageId] = useState<string>("");

  useEffect(() => {
    const container = messagesContainerRef.current;
    const scrollContainer = scrollRef.current;

    if (!container || !scrollContainer) return;

    const mutationCallback = (mutations: MutationRecord[]) => {
      let userMessageNode: Element | null = null;

      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes) as Element[];
          for (const node of addedNodes) {
            if (node?.id.includes("user")) {
              userMessageNode = node;
            }
          }
        }
      }

      if (userMessageNode) {
        const id = userMessageNode.id.replace("user-", "");
        setLastUserMessageId(id);
        requestAnimationFrame(() => {
          scrollContainer.scrollTo(0, scrollContainer.scrollHeight);
        });
      }
    };

    const observer = new MutationObserver(mutationCallback);
    observer.observe(container, {
      childList: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  console.log("messages", messages);

  return (
    <div className="h-full grid grid-rows-[1fr_auto]">
      <div
        ref={scrollRef}
        className="min-h-0 flex justify-center overflow-y-auto scroll-smooth"
      >
        <div ref={messagesContainerRef} className="w-full max-w-2xl">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isLastUserMessage={lastUserMessageId === message.id}
            />
          ))}
          {isLoading && (
            <div className="p-3">
              <Loader className="animate-spin" />
            </div>
          )}
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
