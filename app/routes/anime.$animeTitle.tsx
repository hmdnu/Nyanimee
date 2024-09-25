import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, Await, defer } from "@remix-run/react";
import { Suspense } from "react";
import { DetailAnime } from "~/services";
import { DetailAnime as DetailAnimeComp, AsyncError } from "~/components";
import { TDetailAnime } from "~/types";
import { Env, Exception, Response } from "~/utils/index";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }];
};
export async function loader({ params }: LoaderFunctionArgs) {
  const animeTitle = params.animeTitle;

  if (!animeTitle) throw new Response(404, "Query not found");

  const title = (await new DetailAnime({ baseUrl: Env.baseUrl, jikanUrl: Env.jikanUrl }).get<TDetailAnime>(animeTitle)).data?.title;

  const detailAnime = new DetailAnime({ baseUrl: Env.baseUrl, jikanUrl: Env.jikanUrl }).get<TDetailAnime>(animeTitle).catch((error) => {
    if (error instanceof Exception) {
      throw new Response(error.status, error.statusText);
    }
  });

  return defer(
    {
      detailAnime,
      title,
    },
    {
      headers: { "Cache-Control": "max-age=" + 60 * 60 },
    }
  );
}

export default function DetailAnimePage() {
  const { detailAnime } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={detailAnime} errorElement={<AsyncError />}>
          {(detail) => <DetailAnimeComp anime={detail?.data as TDetailAnime} />}
        </Await>
      </Suspense>
    </div>
  );
}
