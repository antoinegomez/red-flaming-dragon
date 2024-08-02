import { faker } from "@faker-js/faker"
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { sleepTracking } from "./schema"
import { DATABASE_FILE } from "../constants"
import dayjs from "dayjs"

const sqlite = new Database(DATABASE_FILE)

async function main(_db?: BetterSQLite3Database) {
  const db = _db ? _db : drizzle(sqlite)

  for (let i = 0; i < 500; i++) {
    const name = faker.person.firstName()
    const gender = faker.helpers.arrayElement(["Male", "Female", "Other"])
    for (let x = 0; x < 14; x++) {
      await db
        .insert(sleepTracking)
        .values({
          name,
          gender,
          trackedDate: dayjs().subtract(x, "days").format("YYYY-MM-DD"),
          duration: faker.number.int({ min: 1, max: 12 }),
        })
        .execute()
    }
  }

  console.log("done inserting")
}

main()
