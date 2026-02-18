"use client";

import { type SelectChat } from "@/db/schema";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import Link from "next/link";
import { Plus } from "lucide-react";

type Props = {
  initialChats: SelectChat[];
};

export const SidebarChats = (props: Props) => {
  const { initialChats } = props;
  const { toggleSidebar, isMobile } = useSidebar();

  const closeSidebar = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild onClick={closeSidebar}>
            <Link href="/chat">
              <Plus />
              New chat
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        {initialChats.length ? (
          initialChats.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                onClick={closeSidebar}
              >
                <Link href={`/chat/${item.id}`}>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        ) : (
          <div className="min-h-20 flex justify-center items-center">
            <span className="px-2 text-sm text-muted-foreground">No chats</span>
          </div>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
