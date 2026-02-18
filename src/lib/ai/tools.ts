import { InferUITools, tool } from "ai";
import z from "zod";
import { getNextF1Race } from "@/services/f1";
import { getStockPrice } from "@/services/stocks";
import { getWeather } from "@/services/weather";

export const tools = {
  weather: tool({
    description: "Get the weather in a location",
    inputSchema: z.object({
      location: z.string().describe("The location to get the weather for"),
    }),
    execute: async ({ location }) => {
      const weather = await getWeather(location);
      return weather;
    },
  }),
  getStock: tool({
    description: "Get the stock price of symbol",
    inputSchema: z.object({
      symbol: z.string().describe("The symbol of the stock to get the price"),
    }),
    execute: async ({ symbol }) => {
      const stockPrice = await getStockPrice(symbol);
      return stockPrice;
    },
  }),
  getNextF1Race: tool({
    description: "Get the stock price of symbol",
    inputSchema: z
      .object({})
      .describe("Input schema not required for this tool"),
    execute: async () => {
      const nextRace = await getNextF1Race();
      return nextRace;
    },
  }),
};

export type ChatUITools = InferUITools<typeof tools>;
