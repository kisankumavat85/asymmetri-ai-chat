import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="flex justify-between w-full max-w-3xl px-4">
        <div className="font-bold text-xl">Chat App</div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" asChild>
            <Link href="/auth">Sign In</Link>
          </Button>
          <Button>
            <Link href="/auth">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
