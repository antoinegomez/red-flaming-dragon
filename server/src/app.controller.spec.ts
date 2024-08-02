import { Test, TestingModule } from "@nestjs/testing"
import { AppController } from "./app.controller"
import * as schema from "./database/schema" // Import your schema
import { Db } from "./database/db"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import { unlink } from "node:fs/promises"
import { SleepTrackerService } from "./services/sleep-tracker.service"

async function runMigrations(db: Db) {
  migrate(db.getInstance(), { migrationsFolder: "./drizzle" })
}

describe("AppController", () => {
  let appController: AppController
  let db: Db
  const testDbFile = "test.db"

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SleepTrackerService,
        {
          provide: Db,
          useFactory: () => Db.factory(testDbFile),
        },
      ],
      controllers: [AppController],
    }).compile()

    db = module.get<Db>(Db)
    await runMigrations(db)

    appController = module.get(AppController)
  })

  afterEach(async () => {
    await unlink(testDbFile)
  })

  describe("root", () => {
    it("should return correct infos for 1 insert", async () => {
      await db
        .getInstance()
        .insert(schema.sleepTracking)
        .values([
          {
            name: "Robert",
            gender: "Male",
            duration: 7,
            trackedDate: "2024-07-10",
          },
        ])
      const expected = {
        data: [
          {
            name: "Robert",
            gender: "Male",
            total: 1,
          },
        ],
        pagination: {
          page: 0,
          totalPages: 1,
          totalItems: 1,
          limit: 15,
        },
      }
      expect(
        await appController.paginateData({ limit: "15", page: "0" }),
      ).toEqual(expected)
    })

    it("should return correct infos for 3 inserts", async () => {
      await db
        .getInstance()
        .insert(schema.sleepTracking)
        .values([
          {
            name: "Robert",
            gender: "Male",
            duration: 7,
            trackedDate: "2024-07-10",
          },
          {
            name: "Robert",
            gender: "Male",
            duration: 4,
            trackedDate: "2024-07-11",
          },
          {
            name: "Robert",
            gender: "Female",
            duration: 7,
            trackedDate: "2024-07-10",
          },
        ])
      const expected = {
        data: [
          {
            name: "Robert",
            gender: "Female",
            total: 1,
          },
          {
            name: "Robert",
            gender: "Male",
            total: 2,
          },
        ],
        pagination: {
          page: 0,
          totalPages: 1,
          totalItems: 2,
          limit: 15,
        },
      }
      expect(
        await appController.paginateData({ limit: "15", page: "0" }),
      ).toEqual(expected)
    })

    it("should return nothing if pagination out of range", async () => {
      await db
        .getInstance()
        .insert(schema.sleepTracking)
        .values([
          {
            name: "Robert",
            gender: "Male",
            duration: 7,
            trackedDate: "2024-07-10",
          },
          {
            name: "Robert",
            gender: "Male",
            duration: 4,
            trackedDate: "2024-07-11",
          },
          {
            name: "Robert",
            gender: "Female",
            duration: 7,
            trackedDate: "2024-07-10",
          },
        ])
      const expected = {
        data: [],
        pagination: {
          page: 100,
          totalPages: 1,
          totalItems: 2,
          limit: 5,
        },
      }
      expect(
        await appController.paginateData({ limit: "5", page: "100" }),
      ).toEqual(expected)
    })
  })
})
