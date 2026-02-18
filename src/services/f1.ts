import z from "zod";

const f1Schema = z.object({
  MRData: z.object({
    RaceTable: z.object({
      Races: z.array(
        z.object({
          season: z.string(),
          round: z.string(),
          raceName: z.string(),
          Circuit: z.object({
            Location: z.object({
              locality: z.string(),
              country: z.string(),
            }),
          }),
          date: z.string(),
          time: z.string(),
        }),
      ),
    }),
  }),
});

export const getNextF1Race = async () => {
  const year = new Date().getFullYear();
  const api = `https://api.jolpi.ca/ergast/f1/${year}/races/`;
  const response = await fetch(api);
  const json = await response.json();
  const raceData = f1Schema.parse(json);
  return raceData.MRData.RaceTable.Races[0];
};
