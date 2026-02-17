import { AppHeader } from "@/components/app-header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ChatLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-3xl min-h-screen border border-red-400">
        <AppHeader />
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
