import type { SetURLSearchParams } from "react-router-dom";

interface TPaginationProps {
  totalPage: number;
  currentPage: number;
  maxVisiblePages: number;
  setSearchParams: SetURLSearchParams;
}

export default function Pagination({ totalPage, currentPage, maxVisiblePages, setSearchParams }: TPaginationProps) {
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPage - maxVisiblePages + 1));
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPage);

  function handlePrev() {
    const setPage = currentPage > 1 ? currentPage - 1 : currentPage;
    setSearchParams({ page: String(setPage) });
  }

  function handleNext() {
    const setPage = currentPage < totalPage ? currentPage + 1 : currentPage;
    setSearchParams({ page: String(setPage) });
  }

  return (
    <div className="flex gap-2 justify-center mt-[40px]">
      <button
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        onClick={() => setSearchParams({ page: String(1) })}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button>

      <button
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      <div className="flex justify-center gap-2">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
          <button
            key={page}
            onClick={() => setSearchParams({ page: String(page) })}
            disabled={String(page) === String(currentPage)}
            className={`${
              currentPage === page ? "bg-tertiary" : "bg-secondary"
            } hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        onClick={handleNext}
        disabled={currentPage === totalPage}
      >
        {">"}
      </button>

      <button
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        onClick={() => setSearchParams({ page: String(totalPage) })}
        disabled={currentPage === totalPage}
      >
        {">>"}
      </button>
    </div>
  );
}
