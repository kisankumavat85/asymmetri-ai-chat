import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Plus, Sparkles } from "lucide-react";
import { SidebarChats } from "./sidebar-chats";
import Link from "next/link";
import { _getChats } from "@/db/dal/chats";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const AppSidebar = async () => {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth");
  const chats = await _getChats({ userId: session.user.id });

  return (
    <Sidebar>
      <SidebarHeader className="gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Sparkles className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-md font-bold">Chat App</span>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/chat">
                <Plus />
                New chat
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarChats initialChats={chats} />
      </SidebarContent>
    </Sidebar>
  );
};
