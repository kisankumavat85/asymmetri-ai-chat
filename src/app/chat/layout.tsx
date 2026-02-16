import { AppHeader } from "@/components/app-header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ChatLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-3xl border px-4">
        <AppHeader />
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
