import { defineConfig } from "drizzle-kit"
import { DATABASE_FILE } from "src/constants"
export default defineConfig({
  dbCredentials: {
    url: DATABASE_FILE,
  },
  dialect: "sqlite",
  schema: "./src/database/schema.ts",
  out: "./drizzle",
})
