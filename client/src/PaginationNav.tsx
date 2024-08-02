import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"
import { SleepTrackingResponse } from "~/schemas"

function PaginationNavItem({
  page,
  isActive,
}: {
  page: number
  isActive?: boolean
}) {
  return (
    <PaginationItem>
      <PaginationLink isActive={isActive} href={`/?page=${page}`}>
        {page}
      </PaginationLink>
    </PaginationItem>
  )
}

function createRange(range: number[]): number[] {
  const [start, end] = range
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

export function PaginationNav({
  pagination,
}: {
  pagination: SleepTrackingResponse["pagination"]
}) {
  const range = createRange([
    Math.max(1, pagination.page - 2),
    Math.min(pagination.totalPages, pagination.page + 2),
  ])

  const showFirst = pagination.page > 1 && range[0] !== 1
  const showLast =
    pagination.page < pagination.totalPages &&
    range.at(-1) !== pagination.totalPages

  return (
    <Pagination className="py-4">
      <PaginationContent>
        {showFirst && (
          <>
            <PaginationItem>
              <PaginationPrevious href={`/?page=${pagination.page - 1}`} />
            </PaginationItem>
            <PaginationNavItem page={1} />
            {range[0] - 1 > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        {range.map((i) => (
          <PaginationNavItem
            key={`nav-item-${i}`}
            page={i}
            isActive={i === pagination.page}
          />
        ))}
        {showLast && (
          <>
            {(range.at(-1) ?? 0) + 1 < pagination.totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationNavItem page={pagination.totalPages} />
            <PaginationItem>
              <PaginationNext href={`/?page=${pagination.page + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  )
}
