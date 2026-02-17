import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";

export const AppHeader = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between items-center border px-4 shadow w-full h-12">
      <div className="text-md font-bold">Chat App</div>
      <div className="flex items-center gap-2">
        <div className="">{session?.user?.name}</div>
        <SignOutButton icon />
      </div>
    </div>
  );
};
