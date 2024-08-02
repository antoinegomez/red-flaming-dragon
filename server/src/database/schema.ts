import { createId } from "@paralleldrive/cuid2"
import { sql } from "drizzle-orm/sql"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const sleepTracking = sqliteTable("sleep_tracking", {
  sleepTrackingId: text("sleep_tracking_id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  gender: text("gender"),
  trackedDate: text("tracked_date"),
  duration: integer("duration"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at"),
})
