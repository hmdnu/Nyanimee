import { Link } from "@remix-run/react";
import { AnimeInfos } from "~/constant";
import { TDetailAnime } from "~/types";
import { toCamelCase } from "~/utils/camelCase";
import { Env } from "~/utils/env";

export default function DetailAnime({ anime }: { anime: TDetailAnime }) {
  const keys = AnimeInfos.map((anime) => toCamelCase(anime.text));

  return (
    <div>
      <h1 className="heading-1 mb-[40px]">{anime.title}</h1>

      {/* cover img and infos */}
      <div className="flex gap-[45px] bg-secondary rounded-[10px] p-10">
        <img src={anime.coverImg} alt={anime.title} className="rounded-[10px] w-[300px]" />

        <ul className="text-[22px] font-semibold">
          {AnimeInfos.map((info, i) => (
            <li key={info.text}>
              {info.text} : {anime[keys[i] as never]}
            </li>
          ))}
        </ul>
      </div>

      {/* episodes */}
      <div className="mt-[40px]">
        <h1 className="heading-1 mb-[40px]">Episodes</h1>

        <ul className="bg-tertiary p-8 rounded-[10px] flex flex-col gap-3">
          {anime.episodes?.map((anime) => (
            <li key={anime.episode} className="heading-3">
              <Link to={`/download${anime.href.replace(Env.baseUrl, "")}`} state={{ title: anime.href }}>
                <div className="bg-primary hover:bg-primary-hover rounded-[10px] px-[20px] py-[16px] flex justify-between items-center transition-all">
                  <h3>{anime.episode}</h3>
                  <h3>{anime.date.replaceAll(",", " ")}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
