import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, type ChartConfig } from "~/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { GraphInfosResponseSchema } from "~/schemas"
import { Button } from "~/components/ui/button"
import dayjs from "dayjs"

const chartConfig = {
  duration: {
    label: "duration",
    color: "#2563eb",
  },
} satisfies ChartConfig

export function Details() {
  const { name, gender } = useParams()
  const { isPending, error, data } = useQuery({
    queryKey: ["sleep-tracker-graphInfos", name, gender],
    queryFn: () =>
      fetch(
        `http://localhost:3000/api/sleep-tracker/graph-infos/${name}/${gender}`,
      ).then((res) => res.json()),
  })

  if (isPending) {
    return "Loading ..."
  }

  if (error) {
    return "Internal Server Error. Try again later."
  }

  const graphData = GraphInfosResponseSchema.parse(data)

  return (
    <section className="flex flex-col flex-1 w-[80%]">
      <h1 className="text-3xl pb-8">
        Deets for: {name} {gender}
      </h1>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full min-w-[400px] md:max-w-[50%] p-8 border"
      >
        <BarChart accessibilityLayer data={graphData}>
          <YAxis
            dataKey="duration"
            tickLine={true}
            tickMargin={10}
            axisLine={false}
          />
          <XAxis
            dataKey="trackedDate"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => dayjs(value).format("DD/MM")}
          />
          <Bar dataKey="duration" fill="var(--color-duration)" radius={4} />
        </BarChart>
      </ChartContainer>
      <Link className="py-8" to={"/"}>
        <Button>Back to list</Button>
      </Link>
    </section>
  )
}
