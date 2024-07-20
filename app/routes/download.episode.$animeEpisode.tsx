import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getAnimeDownloadUrl } from "~/api/downloadAnime";
import DownloadAnime from "~/components/DownloadAnime";
import { TDownloadAnimeUrl } from "~/types";

type TLoader = {
  downloadUrl: TDownloadAnimeUrl;
  streamUrl: string;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: (data as TLoader).downloadUrl.title }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const animeEpisode = params.animeEpisode;

  if (!animeEpisode) throw json("Anime episode not found", { status: 404 });

  const downloadUrl = await getAnimeDownloadUrl(animeEpisode);

  return json({ downloadUrl });
}

export default function AnimeDownloadPage() {
  const animes = useLoaderData<TLoader>();

  return (
    <div className="base">
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={animes.downloadUrl}>{(anime) => <DownloadAnime anime={anime} />}</Await>
      </Suspense>
    </div>
  );
}
