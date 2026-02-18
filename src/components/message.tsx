import clsx from "clsx";
import Markdown from "react-markdown";
import { ChatMessage } from "@/app/api/chat/route";
import { ChatSpace } from "./chat-space";
import dayjs from "dayjs";
import { Separator } from "./ui/separator";

type Props = {
  message: ChatMessage;
  isLastUserMessage?: boolean;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
                  default:
                    return null;
                }

              case "tool-getStock":
                switch (part.state) {
                  case "input-streaming":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-60 min-h-20"
                      >
                        <p>Fetching Stock price</p>
                      </div>
                    );
                  case "input-available":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-60 min-h-20"
                      >
                        <p>Fetching price for {part.input.symbol}</p>
                      </div>
                    );
                  case "output-available":
                    return (
                      <div key={`${message.id}-${index}`} className="flex">
                        <div className="border rounded-xl p-2 min-w-60">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">
                              {part.output.symbol}
                            </span>
                            <div className="flex flex-col justify-start">
                              <span className="text-xl font-bold">
                                {formatter.format(Number(part.output.price))}
                              </span>
                              <span className="text-xs font-bold">
                                Change of{" "}
                                {formatter.format(Number(part.output.change))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );

                  case "output-error":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-60 min-h-20"
                      >
                        <p className="text-destructive">{part.errorText}</p>
                      </div>
                    );
                  default:
                    return null;
                }
              case "tool-getNextF1Race":
                switch (part.state) {
                  case "input-streaming":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-60 min-h-20"
                      >
                        <p>Fetching Stock price</p>
                      </div>
                    );
                  case "input-available":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-60 min-h-20"
                      >
                        <p>Fetching price for {part.input.symbol}</p>
                      </div>
                    );
                  case "output-available":
                    return (
                      <div key={`${message.id}-${index}`} className="flex mb-2">
                        <div className="border rounded-xl py-2 px-4">
                          <div className="flex flex-col text-sm">
                            <span className="font-semibold font-mono">
                              {part.output.raceName}
                            </span>
                          </div>
                          <Separator className="my-1" />
                          <div className="flex items-center gap-4">
                            <div className="">
                              <span className="text-7xl font-extrabold">
                                R{part.output.round}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs">
                                {dayjs(part.output.date).format("D MMM, YYYY")}
                              </span>
                              <span className="text-xl font-bold">
                                {part.output.Circuit.Location.country}
                              </span>
                              <span className="text-sm">
                                {part.output.Circuit.Location.locality}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );

                  case "output-error":
                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className="min-w-60 min-h-20"
                      >
                        <p className="text-destructive">{part.errorText}</p>
                      </div>
                    );
                  default:
                    return null;
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
