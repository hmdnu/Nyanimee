import { Link } from "@remix-run/react";
import { TGenre } from "~/types";
import { Env } from "~/utils";

export default function GenreCards({ genres }: { genres: TGenre[] }) {
  function getUrl(rawUrl: string) {
    const url = rawUrl
      .replace(Env.baseUrl, "")
      .split("/")
      .filter((url) => url !== "");

    return "/genre/" + url[1];
  }

  return (
    <div className="grid grid-cols-6 gap-5">
      {genres.map((genre) => (
        <Link
          key={genre.name}
          to={getUrl(genre.href)}
          className="bg-secondary text-center p-3 rounded-[10px] hover:bg-secondary-hover active:bg-secondary"
        >
          <h3 className="heading-3">{genre.name}</h3>
        </Link>
      ))}
    </div>
  );
}
