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
      <SidebarInset className="h-dvh flex flex-col overflow-hidden">
        <AppHeader />
        <div className="flex flex-1 flex-col min-h-0 border">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
