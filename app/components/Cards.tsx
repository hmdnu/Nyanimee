import { useLocation, useSearchParams } from "@remix-run/react";
import { TBaseAnime } from "~/types";
import Pagination from "./Pagination";
import Card from "./Card";

export default function Cards({ animes, totalPage }: { animes: TBaseAnime[]; totalPage: number }) {
  const [searchParams, setSearchParams] = useSearchParams({ page: String(1) });
  const location = useLocation();

  const currentPage = Number(searchParams.get("page"));

  return (
    <>
      {animes.length < 1 ? (
        <h1 className="heading-2 mt-[40px]">No result found</h1>
      ) : (
        <div className="grid grid-cols-5 max-sm:grid-cols-1 max-xl:grid-cols-3 place-items-center gap-5">
          {animes.map((anime) => (
            <Card
              key={anime.title}
              title={anime.title}
              coverImg={anime.coverImg}
              href={anime.href}
              day={anime.day}
              episode={anime.episode}
              score={anime.episode}
              status={anime.status}
              totalEpisode={anime.totalEpisode}
            />
          ))}
        </div>
      )}

      {location.pathname === "/search" || animes.length < 1 ? null : (
        <Pagination totalPage={totalPage} currentPage={currentPage} setSearchParams={setSearchParams} maxVisiblePages={4} />
      )}
    </>
  );
}
