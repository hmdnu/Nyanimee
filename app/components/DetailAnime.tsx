import { Link } from "@remix-run/react";
import { useState } from "react";
import { Icons } from "~/constant";
import { TDetailAnime } from "~/types";
import { Env } from "~/utils/env";

export default function DetailAnime({ anime }: { anime: TDetailAnime }) {
  const [notif, setNotif] = useState<{ isNotif: boolean; text?: string }>({ isNotif: false, text: "" });

  function handleCopyLink() {
    try {
      navigator.clipboard.writeText(window.location.href);
      showNotif("Link copied");
    } catch (error) {
      showNotif("Failed to copy link");
    }
  }

  function showNotif(text: string) {
    setNotif({ isNotif: true, text });

    setTimeout(() => {
      setNotif({ isNotif: false });
    }, 2500);
  }

  return (
    <>
      <div className="flex flex-col gap-5 justify-between">
        {/* details */}
        <section className="bg-secondary p-10 rounded-[20px] h-fit flex lg:flex-row flex-col md:items-start items-center gap-10 relative">
          <img src={anime.coverImg} alt={anime.title} className="w-[300px] h-[450px] rounded-[10px]" />

          <div>
            <h1 className="heading-1 ">{anime.title}</h1>
            <div className="heading-4 flex md:flex-row flex-col md:gap-5 gap-2 mt-5">
              <h4>Score | {anime.score || "-"}</h4>
              <h4>Studio | {anime.studio}</h4>
              <h4>Status | {anime.status}</h4>
              <h4>Type | {anime.type}</h4>
            </div>

            <p className="paragraph mt-5">{anime.synopsis}</p>

            <div className="flex gap-2 mt-5">
              {anime.genres.map((genre, i) => (
                <div key={i} className="heading-4 bg-tertiary px-3 py-1 rounded-[10px]">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>

          {/* share button */}
          <button
            onClick={handleCopyLink}
            className="hover:bg-tertiary absolute lg:top-10 sm:right-10 right-5 max-lg:bottom-9 p-2 rounded-[10px] transition"
          >
            <img src={Icons.share} alt="share icon" className="w-5" />
          </button>

          {/* notif */}
          {notif.isNotif && <div className="bg-white text-black heading-4 absolute top-[85px] right-14 px-3 py-1 rounded-[10px]">Link copied</div>}
        </section>

        <section className="flex lg:flex-row flex-col justify-between gap-5">
          {/* info */}
          <div className="bg-secondary py-10 px-8 rounded-[20px] w-full flex flex-col gap-2 h-fit">
            <span className="flex justify-between">
              <h3 className="heading-3">Total episodes</h3>
              <h3 className="heading-3">
                {anime.totalEpisode || "-"} {Number(anime.totalEpisode) < 2 ? "" : "Episodes"}
              </h3>
            </span>
            <span className="flex justify-between">
              <h3 className="heading-3">Duration</h3>
              <h3 className="heading-3">{anime.duration || "-"}</h3>
            </span>
            <span className="flex justify-between">
              <h3 className="heading-3">Aired</h3>
              <h3 className="heading-3">{anime.aired || "-"}</h3>
            </span>
            <span className="flex justify-between">
              <h3 className="heading-3">Rating</h3>
              <h3 className="heading-3">{anime.rating || "-"}</h3>
            </span>
          </div>

          {/* trailer */}
          <div className="bg-secondary py-10 px-8 rounded-[20px] w-full">
            <h1 className="heading-1">Trailer</h1>

            <iframe src={anime.trailerUrl} title={anime.title} className="mt-5 w-full h-[400px] rounded-[20px]"></iframe>
          </div>
        </section>
      </div>

      {/* episodes */}
      <div className="mt-[40px]">
        <h1 className="heading-1 mb-[40px]">Episodes</h1>

        <ul className="bg-tertiary p-8 rounded-[10px] flex flex-col gap-3">
          {anime.episodes?.map((anime) => (
            <li key={anime.episode} className="heading-3">
              <Link to={`/download${anime.href.replace(Env.baseUrl, "")}`} state={{ title: anime.href }}>
                <div className="bg-primary hover:bg-primary-hover rounded-[10px] px-[20px] py-[16px] flex md:flex-row flex-col justify-between sm:items-center sm:gap-0 gap-5 items-start transition-all">
                  <h3>{anime.episode}</h3>
                  <img src={Icons.download} alt="download icon" className="w-6" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
