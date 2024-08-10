import { Link } from "@remix-run/react";
import { Env } from "~/utils";

type TCard = {
  title: string;
  href: string;
  coverImg: string;
  episode: string | undefined;
  status: string | undefined;
  totalEpisode: string | undefined;
  day: string | undefined;
  score: string | undefined;
};

export default function Card({ title, href, coverImg, episode, status, totalEpisode, day, score }: TCard) {
  return (
    <div className="bg-secondary-hover hover:bg-secondary transition-all rounded-[5px] w-full h-full flex flex-col justify-center px-2 py-5 mx-auto">
      <Link to={href.replace(Env.baseUrl, "")}>
        <img src={coverImg} alt={title} className="w-[90%] rounded-[5px] mx-auto" />

        <div className="pt-5 w-[90%] mx-auto">
          <h3 className="heading-3 line-clamp-1 mb-2">{title}</h3>
          <div className="flex justify-between">
            <h4 className="heading-4">{episode || status || totalEpisode}</h4>
            <h4 className="heading-4">{day || score}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
}
