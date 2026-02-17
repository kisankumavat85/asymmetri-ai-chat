"use client";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

export const PromptInput = () => {
  return (
    <div className="flex gap-2 rounded-md p-3 justify-center items-end border w-full">
      <Textarea
        rows={1}
        className="p-0 resize-none border-none min-h-18 max-h-40 shadow-none focus-visible:ring-0"
      />
      <div className="flex justify-end">
        <Button onClick={() => {}} size="icon-sm">
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
};
