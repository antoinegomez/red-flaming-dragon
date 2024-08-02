import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { Injectable } from "@nestjs/common"

@Injectable()
export class Db {
  db: BetterSQLite3Database

  constructor(file: string) {
    const sqlite = new Database(file)
    sqlite.pragma("journal_mode = WAL")
    this.db = drizzle(sqlite)
  }

  static factory(file: string) {
    return new Db(file)
  }

  getInstance() {
    return this.db
  }
}
