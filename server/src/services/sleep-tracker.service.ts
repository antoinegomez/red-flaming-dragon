import { Inject, Injectable } from "@nestjs/common"
import { and, eq, sql } from "drizzle-orm/sql"
import { Db } from "../database/db"
import { sleepTracking } from "../database/schema"
import type { SleepTracking } from "../schemas"

@Injectable()
export class SleepTrackerService {
  @Inject() private readonly db: Db

  private readonly schema: typeof sleepTracking

  constructor() {
    this.schema = sleepTracking
  }

  async trackSleep(inputData: SleepTracking) {
    await this.db.getInstance().insert(this.schema).values(inputData)
    return inputData
  }

  async paginateData(page = 1, limit = 20) {
    const results = await this.db
      .getInstance()
      .select({
        name: sleepTracking.name,
        gender: sleepTracking.gender,
        total: sql<number>`count(*)`.as("total"),
      })
      .from(this.schema)
      .groupBy(sleepTracking.name, sleepTracking.gender)
      .limit(limit)
      .offset((page - 1) * limit)

    const countQuery = this.db
      .getInstance()
      .select({
        count: sql<number>`count(distinct ${sleepTracking.name} || ',' || ${sleepTracking.gender})`,
      })
      .from(this.schema)

    const [{ count }] = await countQuery.execute()

    return {
      data: results,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    }
  }

  async getGraphInfo(name: string, gender: string) {
    return await this.db
      .getInstance()
      .select({
        trackedDate: sleepTracking.trackedDate,
        duration: sleepTracking.duration,
      })
      .from(sleepTracking)
      .where(
        and(eq(sleepTracking.name, name), eq(sleepTracking.gender, gender)),
      )
      .orderBy(sleepTracking.trackedDate)
      .limit(7)
  }
}
