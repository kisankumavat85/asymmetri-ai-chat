import { memo } from "react";

// 115: Prompt input height
// 54 : Header
// 6  : White space on top after scroll
const height = 115 + 54 + 6;

export const ChatSpace = memo(() => {
  return (
    <div
      style={{
        marginBottom: `calc(${height}px - 100vh)`,
        height: `calc(100vh - ${height}px)`,
      }}
      className={`invisible pointer-events-none p-3`}
    />
  );
});

ChatSpace.displayName = "ChatSpace";
