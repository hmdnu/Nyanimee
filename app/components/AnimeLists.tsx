import { Link } from "@remix-run/react";
import { TAnimeLists } from "~/types";
import { Env } from "~/utils/env";

export default function AnimeLists({ animes }: { animes: TAnimeLists[] }) {
  return (
    <>
      {animes.map((anime) => (
        <div key={anime.alphabet}>
          <h1 className="heading-1 my-[20px] border-b-[1px] border-white pb-2">{anime.alphabet}</h1>

          <ul className="grid md:grid-cols-2 grid-cols-1 gap-x-5">
            {anime.animes.map((anime) => (
              <li key={anime.title} className="paragraph hover:underline mb-1">
                <Link to={anime.href.replace(Env.baseUrl, "")}>
                  <span className="flex gap-2">
                    <p>{anime.title.replace("On-Going", "")}</p>
                    {anime.title.includes("On-Going") ? <p className="text-green-500">On Going</p> : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
