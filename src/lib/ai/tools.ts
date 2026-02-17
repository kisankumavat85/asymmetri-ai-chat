import { getWeather } from "@/services/weather";
import { InferUITools, tool } from "ai";
import z from "zod";

export const tools = {
  weather: tool({
    description: "Get the weather in a location",
    inputSchema: z.object({
      location: z.string().describe("The location to get the weather for"),
    }),
    execute: async ({ location }) => {
      const weather = await getWeather(location);
      console.log("weather", weather);
      return weather;
    },
  }),
  // getStock: tool({

  // })
};

export type ChatUITools = InferUITools<typeof tools>;
