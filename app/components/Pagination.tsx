import { useSearchParams } from "@remix-run/react";

export default function Pagination() {
  const totalPage = 6;
  const maxVisiblePages = 4;

  const [searchParams, setSearchParams] = useSearchParams({ page: String(1) });
  const currentPage = Number(searchParams.get("page"));

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPage - maxVisiblePages + 1)
  );
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
    <div className="flex gap-5 justify-center mt-[40px]">
      <button
        className="bg-secondary hover:bg-secondary-hover px-3 py-1 rounded-[5px] font-semibold text-lg transition"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="flex justify-center gap-5">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
          <button
            key={page}
            onClick={() => setSearchParams({ page: String(page) })}
            disabled={String(page) === searchParams.get("page")}
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
        Next
      </button>
    </div>
  );
}
