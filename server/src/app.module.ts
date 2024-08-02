import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { Db } from "./database/db"
import { DATABASE_FILE } from "./constants"
import { SleepTrackerService } from "./services/sleep-tracker.service"

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: Db,
      useValue: Db.factory(DATABASE_FILE),
    },
    SleepTrackerService,
  ],
})
export class AppModule {}
