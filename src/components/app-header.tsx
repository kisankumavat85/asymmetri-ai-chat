import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";
import { SidebarTrigger } from "./ui/sidebar";

export const AppHeader = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between items-center border px-4 py-2 shadow w-full">
      <div className="text-md font-bold">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-2">
        <div className="">{session?.user?.name}</div>
        <SignOutButton icon />
      </div>
    </div>
  );
};
