import { PromptInput } from "@/components/prompt-input";

const ChatPage = async () => {
  return (
    <div className="min-h-full grid grid-rows-[1fr_auto]">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl  overflow-y-auto">Chat</div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl pb-4">
          <PromptInput />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
