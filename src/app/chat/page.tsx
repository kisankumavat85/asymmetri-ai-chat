import { auth } from "@/auth";

const ChatPage = async () => {
  const session = await auth();
  return (
    <div>
      ChatPage
      <div className="">
        <code>{JSON.stringify(session)}</code>
      </div>
    </div>
  );
};

export default ChatPage;
