import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

const SIBLING_COUNT = 1;

type PageToken = number | "ellipsis-start" | "ellipsis-end";

/** [1, "ellipsis-start", 4, 5, 6, "ellipsis-end", 10] */
export function getPageTokens(page: number, pageCount: number): PageToken[] {
  const first = Math.max(2, page - SIBLING_COUNT);
  const last = Math.min(pageCount - 1, page + SIBLING_COUNT);
  const tokens: PageToken[] = [1];

  if (first > 2) tokens.push("ellipsis-start");
  for (let current = first; current <= last; current += 1) tokens.push(current);
  if (last < pageCount - 1) tokens.push("ellipsis-end");
  if (pageCount > 1) tokens.push(pageCount);

  return tokens;
}

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/** Use inside a Client Component (it takes an onPageChange callback). */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-between gap-3", className)}>
      <p className="text-helper text-fg-secondary">
        Page <span className="font-medium text-fg">{page}</span> of{" "}
        <span className="font-medium text-fg">{pageCount}</span>
      </p>
      <ul className="flex items-center gap-1">
        <li>
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
        </li>
        {getPageTokens(page, pageCount).map((token) =>
          typeof token === "number" ? (
            <li key={token} className="hidden sm:block">
              <Button
                variant={token === page ? "secondary" : "ghost"}
                size="icon"
                aria-label={`Page ${token}`}
                aria-current={token === page ? "page" : undefined}
                onClick={() => onPageChange(token)}
                className={cn(token === page && "text-fg")}
              >
                {token}
              </Button>
            </li>
          ) : (
            <li key={token} aria-hidden="true" className="hidden px-1 text-fg-muted sm:block">
              ...
            </li>
          ),
        )}
        <li>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next page"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
