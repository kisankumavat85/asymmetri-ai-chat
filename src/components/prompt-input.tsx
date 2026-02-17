"use client";

import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  onSubmit: (prompt: string) => void;
};

export const PromptInput = (props: Props) => {
  const { onSubmit } = props;
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (!prompt) return;
    onSubmit(prompt.trim());
    setPrompt("");
  };

  return (
    <div className="flex gap-2 rounded-md p-3 justify-center items-end border w-full shadow">
      <Textarea
        ref={textareaRef}
        placeholder="Ask anything"
        rows={1}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className="p-0 resize-none border-none min-h-18 max-h-40 shadow-none focus-visible:ring-0"
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="icon-sm">
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
};
