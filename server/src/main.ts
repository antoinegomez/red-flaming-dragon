import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ZodFilter } from "./lib/zod.filter"

const port = process.env.PORT ? Number(process.env.PORT) : 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalFilters(new ZodFilter())
  await app.listen(port)
}
bootstrap()
