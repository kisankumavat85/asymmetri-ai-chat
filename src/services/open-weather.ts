import z from "zod";

const geoSchema = z.array(
  z.object({
    name: z.string(),
    state: z.string().optional(),
    country: z.string().optional(),
    lat: z.number(),
    lon: z.number(),
  }),
);

const weatherSchema = z.object({
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
    }),
  ),
});

export const getWeather = async (location: string) => {
  try {
    const key = process.env.OPEN_WEATHER_API_KEY!;
    const geoSearchParams = new URLSearchParams();
    geoSearchParams.set("q", location);
    geoSearchParams.set("appid", key);
    geoSearchParams.set("limit", "1");
    const geoParams = geoSearchParams.toString();

    const geoResponse = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct" + "?" + geoParams,
    );
    const geoJson = await geoResponse.json();
    console.log("geoJson ----- ", geoJson);
    const [geoData] = geoSchema.parse(geoJson);

    const weatherSearchParams = new URLSearchParams();
    weatherSearchParams.set("appid", key);
    weatherSearchParams.set("units", "metric");
    weatherSearchParams.set("lat", geoData.lat.toString());
    weatherSearchParams.set("lon", geoData.lon.toString());
    const weatherParams = weatherSearchParams.toString();

    const weatherResponse = await fetch(
      "https://api.openweathermap.org/data/2.5/weather" + "?" + weatherParams,
    );
    const weatherJson = await weatherResponse.json();
    console.log("weatherJson", weatherJson);
    const weatherData = weatherSchema.parse(weatherJson);

    return {
      geoData,
      weatherData,
    };
  } catch (error) {
    console.error("Weather Error: ", error);
  }
};
