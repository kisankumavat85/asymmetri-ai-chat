This is a Chat App Assignment of Asymmetri

## Getting started

First add the environment variables listed in `.env.example` file located in root dir into `.env` file.

These are the required environment variables
- `AUTH_DRIZZLE_URL`
- `AUTH_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `OPENAI_API_KEY`
- `ALPHA_VANTAGE_API_KEY`
- `OPEN_WEATHER_API_KEY`

Once `.env` file is ready with vars, run `npm run db:generate` cmd to generate the migration files if there is no migrations file available.

If there are already migrations file or you have generated that, now run `npm run db:migrate` cmd to apply the migratiions.

Once done with migration files you are ready to use the app.

### Packages used
- `ai` - Vercel's AI SDK
- `@ai-sdk/openai` - OpenAI provider package for Vercel's AI SDK
- `@ai-sdk/react` - TypeScript package to intergrate with client side chat
- `zod` - Validation
- `tailwind` - For styling and Schacn UI for components
- `drizzle-orm` - ORM for postgres
- `@neondatabase/serverless` - For remote database