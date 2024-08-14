import { Link } from "@remix-run/react";
import { TDownloadAnimeUrl } from "~/types";

export default function DownloadAnime({ anime }: { anime: TDownloadAnimeUrl }) {
  return (
    <>
      <h1 className="heading-2 mb-[40px]">{anime.title}</h1>
      <div className="flex flex-col gap-3 bg-tertiary p-10 rounded-[20px]">
        {anime.downloadUrl.map((anime) => (
          <div key={anime.resolution} className="flex flex-col gap-5 justify-between items-center bg-primary px-10 py-4">
            <h4 className="bg-tertiary px-4 py-2 heading-3 rounded-[20px]">
              {anime.resolution} | {anime.size}
            </h4>

            <div className="flex md:flex-row flex-col gap-10">
              {anime.providers.map((provider) => (
                <Link
                  key={provider.provider}
                  to={provider.href}
                  target="_blank"
                  rel="noreferrer"
                  className="heading-3 hover:bg-primary-hover px-3 py-2 rounded-[20px] transition"
                >
                  {provider.provider}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
