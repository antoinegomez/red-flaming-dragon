import { z } from "zod"

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export const SleepTrackingSchema = z.object({
  name: z.string().min(1).max(100),
  gender: z.nativeEnum(Gender),
  duration: z.number().min(0).max(12),
  trackedDate: z.string().date(),
})

export type SleepTracking = z.infer<typeof SleepTrackingSchema>

export const SleepTrackingListResponseSchema = z.object({
  data: z.array(
    z.object({
      name: z.string().min(1).max(100),
      gender: z.nativeEnum(Gender),
      total: z.number().min(1),
    }),
  ),
  pagination: z.object({
    limit: z.number().min(0).max(50),
    page: z.number().min(0),
    totalItems: z.number().min(0),
    totalPages: z.number().min(0),
  }),
})

export type SleepTrackingResponse = z.infer<
  typeof SleepTrackingListResponseSchema
>

export const GraphInfosResponseSchema = z.array(
  z.object({
    trackedDate: z.string().date(),
    duration: z.number(),
  }),
)

export type GraphInfosResponse = z.infer<typeof GraphInfosResponseSchema>
