import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, json } from "@remix-run/react";
import { getDetailAnime } from "~/api";
import { TDetailAnime } from "~/types";

type TLoader = {
  anime: TDetailAnime;
};

export const meta: MetaFunction = ({ data }) => {
  return [{ title: (data as TLoader).anime.title }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const animeTitle = params.animeTitle;

  if (!animeTitle) return json("Anime Title Not Found", { status: 404 });

  const detailAnime = await getDetailAnime(animeTitle);

  const maxAge = 60 * 60 * 24;
  return json(
    { anime: detailAnime },
    {
      headers: {
        "Cache-Control": "max-age" + maxAge,
      },
    }
  );
}

export default function DetailAnime() {
  const data = useLoaderData<TLoader>();

  return <div className="base">{data.anime.title}</div>;
}
