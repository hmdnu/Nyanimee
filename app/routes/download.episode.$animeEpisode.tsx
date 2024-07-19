import { LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import { getAnimeDownloadUrl } from "~/api/downloadAnime";
import { TDownloadAnimeUrl } from "~/types";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: (data as TDownloadAnimeUrl).title }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const animeEpisode = params.animeEpisode;

  if (!animeEpisode) throw json("Anime episode not found", { status: 404 });

  const downloadUrl = await getAnimeDownloadUrl(animeEpisode);

  return json(downloadUrl);
}

export default function AnimeDownloadPage() {
  const animes = useLoaderData<TDownloadAnimeUrl>();

  return (
    <div className="base">
      <h1>{animes.title}</h1>
    </div>
  );
}
