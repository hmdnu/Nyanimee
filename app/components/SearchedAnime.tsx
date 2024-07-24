import { Link } from "@remix-run/react";
import { TSearchAnime } from "~/types";
import { Env } from "~/utils/env";

export default function SearchedAnime({ animes }: { animes: TSearchAnime[] }) {
  return (
    <>
      {animes.length < 1 ? (
        <h1 className="heading-2">No Result found</h1>
      ) : (
        <ul className="grid grid-cols-5 max-sm:grid-cols-1 max-xl:grid-cols-3 place-items-center gap-5">
          {animes.map((anime) => (
            <li
              key={anime.title}
              className="bg-secondary-hover hover:bg-secondary transition-all rounded-[5px] w-full h-full flex flex-col justify-center px-2 py-5"
            >
              <Link to={anime.href.replace(Env.baseUrl, "")}>
                <div>
                  <img
                    src={anime.coverImg}
                    alt={anime.title}
                    className="max-sm:w-[50%] w-[90%] rounded-[5px] mx-auto"
                  />

                  <div className="pt-5 w-[90%] mx-auto">
                    <h3 className="heading-3 line-clamp-1 mb-2">{anime.title}</h3>
                    <div className="flex justify-between">
                      <h4 className="heading-4">{anime.status}</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
