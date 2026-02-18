import { type SelectChat } from "@/db/schema";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";

type Props = {
  initialChats: SelectChat[];
};

export const SidebarChats = (props: Props) => {
  const { initialChats } = props;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        {initialChats.length ? (
          initialChats.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild tooltip={item.title}>
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
