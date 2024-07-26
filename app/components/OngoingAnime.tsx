import { Link, useSearchParams } from "@remix-run/react";
import { TBaseAnime } from "~/types";
import { Env } from "~/utils/env";
import Pagination from "./Pagination";

export default function OngoingAnime({ animes }: { animes: TBaseAnime[] }) {
  const [searchParams, setSearchParams] = useSearchParams({ page: String(1) });

  const currentPage = Number(searchParams.get("page"));

  return (
    <>
      {animes.length < 1 ? (
        <>No result found</>
      ) : (
        <ul className="grid grid-cols-5 max-sm:grid-cols-1 max-xl:grid-cols-3 place-items-center gap-5">
          {animes.map((anime) => (
            <li
              key={anime.title}
              className="bg-secondary-hover hover:bg-secondary transition-all rounded-[5px] max-sm:w-[80%] w-full h-full flex flex-col justify-center px-2 py-5"
            >
              <Link to={anime.href.replace(Env.baseUrl, "")} prefetch="intent" rel="prefetch">
                <div>
                  <img src={anime.coverImg} alt={anime.title} className="w-[90%] rounded-[5px] mx-auto" />

                  <div className="pt-5 w-[90%] mx-auto">
                    <h3 className="heading-3 line-clamp-1 mb-2">{anime.title}</h3>
                    <div className="flex justify-between">
                      <h4 className="heading-4">{anime.episode}</h4>
                      <h4 className="heading-4">{anime.day}</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Pagination totalPage={6} currentPage={currentPage} setSearchParams={setSearchParams} maxVisiblePages={4} />
    </>
  );
}
