import { Link, useLocation } from "@remix-run/react";

interface TPaginationProps {
  totalPage: number;
  currentPage: number;
  maxVisiblePages: number;
}

export default function Pagination({ totalPage, currentPage, maxVisiblePages }: TPaginationProps) {
  const location = useLocation();

  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPage - maxVisiblePages + 1));
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPage);

  function handlePrev() {
    const setPage = currentPage > 1 ? currentPage - 1 : currentPage;
    return setPage;
  }

  function handleNext() {
    const setPage = currentPage < totalPage ? currentPage + 1 : currentPage;
    return setPage;
  }

  return (
    <div className="flex gap-2 justify-center mt-[40px]">
      <Link
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        to={{ pathname: location.pathname, search: "?page=" + 1 }}
      >
        {"<<"}
      </Link>

      <Link
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        to={{ pathname: `${location.pathname}`, search: "?page=" + String(handlePrev()) }}
      >
        {"<"}
      </Link>

      {/* pages */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
          <Link
            key={page}
            to={{ pathname: location.pathname, search: "?page=" + page }}
            className={`${
              currentPage === page ? "bg-tertiary" : "bg-secondary"
            } hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        to={{ pathname: location.pathname, search: "?page=" + String(handleNext()) }}
      >
        {">"}
      </Link>

      <Link
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        to={{ pathname: location.pathname, search: "?page=" + totalPage }}
      >
        {">>"}
      </Link>
    </div>
  );
}
