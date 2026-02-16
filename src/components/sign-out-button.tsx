import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

type Props = {
  icon?: boolean;
};

export const SignOutButton = (props: Props) => {
  const { icon } = props;
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="outline" size={icon ? "icon" : "default"}>
        <LogOut /> {!icon && "Sign out"}
      </Button>
    </form>
  );
};
