import clsx from "clsx";
import Markdown from "react-markdown";
import { ChatMessage } from "@/app/api/chat/route";
import { ChatSpace } from "./chat-space";

type Props = {
  message: ChatMessage;
  isLastUserMessage?: boolean;
};

const Message = (props: Props) => {
  const { message, isLastUserMessage } = props;

  const isUser = message.role === "user";
  const id = isUser ? `user-${message.id}` : `assistant-${message.id}`;

  return (
    <div id={id} className="my-2">
      {isLastUserMessage && <ChatSpace />}
      <div
        className={clsx("flex", {
          "justify-end": isUser,
        })}
      >
        <div
          className={clsx("p-3 rounded-md", {
            "bg-accent text-accent-foreground max-w-[70%]": isUser,
            "w-full": !isUser,
          })}
        >
          {message.parts.map((part, index) => {
            switch (part.type) {
              case "text":
                return (
                  <div
                    key={`${message.id}-${index}`}
                    className="prose dark:prose-invert"
                  >
                    <Markdown>{part.text}</Markdown>
                  </div>
                );

              case "tool-weather":
                switch (part.state) {
                  case "input-streaming":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-50 h-20"
                      >
                        <p>Fetching weather</p>
                      </div>
                    );
                  case "input-available":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-50 h-20"
                      >
                        <p>Fetching weather for {part.input.location}</p>
                      </div>
                    );
                  case "output-available":
                    return (
                      <div key={`${message.id}-${index}`} className="flex">
                        <div className="border rounded-xl p-2 min-w-50">
                          <div className="">
                            <p className="text-3xl text-center font-bold">
                              {part.output?.weatherData.main.temp.toFixed(0)}
                              &deg;C
                            </p>
                            <p className="text-xs text-center">
                              Feels like{" "}
                              {part.output?.weatherData.main.feels_like.toFixed(
                                0,
                              )}
                              &deg;C
                            </p>
                          </div>
                          <p className="text-sm text-center font-semibold">
                            {part.output?.geoData.name},{" "}
                            {part.output?.geoData.state ||
                              part.output?.geoData.country}
                          </p>
                        </div>
                      </div>
                    );

                  case "output-error":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-50 h-20"
                      >
                        <p className="text-destructive">{part.errorText}</p>
                      </div>
                    );
                }

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;
