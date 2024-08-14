import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, MetaFunction, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { DownloadAnime as DownloadAnimeComp } from "~/components/index";
import { DownloadAnime } from "~/services/index";
import { TDownloadAnimeUrl } from "~/types";
import { Exception, Response } from "~/utils";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const animeEpisode = params.animeEpisode;
  const type = params.type;

  if (!animeEpisode || !type) {
    throw new Response(404, "Missing query");
  }
  const title = await new DownloadAnime().get(animeEpisode, type);

  const downloadUrl = new DownloadAnime().get(animeEpisode, type).catch((error) => {
    if (error instanceof Exception) {
      throw new Response(error.status, error.statusText);
    }
  });

  if (!title) {
    throw new Response(404, "Cant find title");
  }

  return defer(
    { downloadUrl, title: (title.data as TDownloadAnimeUrl).title },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
    }
  );
}

export default function AnimeDownloadPage() {
  const { downloadUrl } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={downloadUrl}>{(anime) => <DownloadAnimeComp anime={anime.data as TDownloadAnimeUrl} />}</Await>
      </Suspense>
    </div>
  );
}
