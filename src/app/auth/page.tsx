"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const AuthPage = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-3xl flex justify-center">
        <div className="flex flex-col gap-4 pt-32">
          <Button onClick={() => signIn("github")}>
            Login with GitHub
          </Button>
          <Button onClick={() => signIn("google")}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
