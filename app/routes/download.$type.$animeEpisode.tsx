import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { DownloadAnime as DownloadAnimeComp } from "~/components/index";
import { DownloadAnime } from "~/services/index";
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
  const type = params.type;

  if (!animeEpisode || !type) throw json("Anime episode not found", { status: 404 });

  const downloadUrl = new DownloadAnime().get(animeEpisode, type);

  return json(
    { downloadUrl },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
    }
  );
}

export default function AnimeDownloadPage() {
  const animes = useLoaderData<TLoader>();

  return (
    <div className="base">
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={animes.downloadUrl}>{(anime) => <DownloadAnimeComp anime={anime} />}</Await>
      </Suspense>
    </div>
  );
}
