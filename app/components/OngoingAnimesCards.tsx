import { Link } from "@remix-run/react";
import { TOngoingAnimes } from "~/types";
import { Env } from "~/utils/env";

export default function OngoingAnimesCards({ ongoingAnimes }: { ongoingAnimes: TOngoingAnimes[] }) {
  return (
    <div className="grid grid-cols-5 place-items-center gap-5">
      {ongoingAnimes.map((anime) => (
        <Link
          key={anime.title}
          to={anime.href.replace(Env.baseUrl, "")}
          target="_blank"
          rel="noreferrer"
          className="bg-secondary rounded-[10px] w-[300px] flex flex-col items-center p-6"
        >
          <div>
            <img src={anime.coverImg} alt={anime.title} className="w-[300px] h-[350px] rounded-[10px]" />

            <div className="pt-5">
              <h3 className="heading-3 line-clamp-1 mb-1">{anime.title}</h3>
              <h4 className="heading-4">{anime.episode}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
