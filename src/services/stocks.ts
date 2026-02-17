import z from "zod";

const stockSchema = z.object({
  "Global Quot": z.object({
    "01. symbol": z.string(),
    "05. price": z.string(),
    "09. change": z.string(),
    "10. change percent": z.string(),
  }),
});

export const getStock = async (symbol: string) => {
  const key = process.env.ALPHA_VANTAGE_API_KEY!;
  const searchParams = new URLSearchParams();
  searchParams.set("symbol", symbol);
  searchParams.set("apikey", key);
  searchParams.set("function", "GLOBAL_QUOTE");
  const params = searchParams.toString();

  const response = await fetch(
    "https://www.alphavantage.co/query" + "?" + params,
  );
  const json = await response.json();
  console.log("geoJson ----- ", json);
  const stock = stockSchema.parse(json);
  console.log("stock", stock);
  return stock;
};
