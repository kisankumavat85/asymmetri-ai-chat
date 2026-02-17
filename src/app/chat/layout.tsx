import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ChatLayout = (props: Props) => {
  const { children } = props;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="grow border">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
