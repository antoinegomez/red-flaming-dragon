import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from "@nestjs/common"
import { SleepTrackerService } from "./services/sleep-tracker.service"
import { ZodValidationPipe } from "./lib/zod.pipe"
import { SleepTrackingSchema, type SleepTracking } from "./schemas"

@Controller("/api/sleep-tracker")
export class AppController {
  @Inject() private readonly sleepTracker: SleepTrackerService

  @Post()
  async trackSleep(
    @Body(new ZodValidationPipe(SleepTrackingSchema)) body: SleepTracking,
  ) {
    return await this.sleepTracker.trackSleep(body)
  }

  @Get()
  async paginateData(@Query() params: { limit: string; page: string }) {
    const limit = params.limit ? Number(params.limit) : undefined
    const page = params.page ? Number(params.page) : undefined
    return await this.sleepTracker.paginateData(page, limit)
  }

  @Get("/graph-infos/:name/:gender")
  async graphInfos(
    @Param("name") name: string,
    @Param("gender") gender: string,
  ) {
    return await this.sleepTracker.getGraphInfo(name, gender)
  }
}
