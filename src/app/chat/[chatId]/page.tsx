import { _getMessages } from "@/db/dal/messages";
import { Chat } from "../chat";

type Props = {
  params: Promise<{ chatId: string }>;
};

const ActiveChatPage = async (props: Props) => {
  const { params } = props;
  const { chatId } = await params;
  const messages = await _getMessages(chatId);

  return <Chat chatId={chatId} initialMessages={messages} />;
};

export default ActiveChatPage;
