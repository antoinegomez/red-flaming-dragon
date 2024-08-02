import { useQuery } from "@tanstack/react-query"
import {
  SleepTrackingListResponseSchema,
  SleepTrackingResponse,
} from "./schemas"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { PaginationNav } from "~/PaginationNav"
import { useNavigate, useSearchParams } from "react-router-dom"

export function List() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  let page = Number(searchParams.get("page"))

  if (!page) {
    page = Number(localStorage.getItem("sleep-tracker-list-page")) || 1
  } else {
    localStorage.setItem("sleep-tracker-list-page", String(page))
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["sleep-tracker-list", page],
    queryFn: () =>
      fetch(`http://localhost:3000/api/sleep-tracker?page=${page}`).then(
        (res) => res.json(),
      ),
  })

  if (isPending) {
    return "Loading..."
  }

  if (error) {
    return "Internal Server Error. Please try again later"
  }

  function displayGraph(item: SleepTrackingResponse["data"][number]) {
    navigate(`/show/${item.name}/${item.gender}`)
  }

  const { data: list, pagination } = SleepTrackingListResponseSchema.parse(data)

  return (
    <section className="flex flex-col flex-1 w-[80%]">
      <h1 className="text-2xl pb-8">Tracking infos</h1>
      <PaginationNav pagination={pagination} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Entries</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item) => (
            <TableRow
              className="cursor-pointer"
              key={item.name}
              onClick={() => displayGraph(item)}
            >
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationNav pagination={pagination} />
    </section>
  )
}
