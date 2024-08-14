import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, Await, defer } from "@remix-run/react";
import { Suspense } from "react";
import { DetailAnime } from "~/services";
import { DetailAnime as DetailAnimeComp, AsyncError } from "~/components";
import { TDetailAnime } from "~/types";
import { Exception, Response } from "~/utils/index";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const animeTitle = params.animeTitle;

  if (!animeTitle) throw new Response(404, "Query not found");

  const title = await new DetailAnime().get(animeTitle);

  const detailAnime = new DetailAnime().get(animeTitle).catch((error) => {
    if (error instanceof Exception) {
      throw new Response(error.status, error.statusText);
    }
  });

  if (!title) {
    throw new Response(404, "Cant find title");
  }

  return defer(
    { detailAnime, title: (title.data as TDetailAnime).title },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
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
