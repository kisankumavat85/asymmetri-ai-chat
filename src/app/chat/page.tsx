import { PromptInput } from "@/components/prompt-input";

const ChatPage = async () => {
  return (
    <div className="grow grid grid-rows-[1fr_auto] p-4">
      <div className="">Chat here</div>
      <div className="flex justify-center">
        <PromptInput />
      </div>
    </div>
  );
};

export default ChatPage;
