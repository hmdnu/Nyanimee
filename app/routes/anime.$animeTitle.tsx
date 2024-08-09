import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, Await, defer } from "@remix-run/react";
import { Suspense } from "react";
import { DetailAnime, Response } from "~/services";
import { DetailAnime as DetailAnimeComp, AsyncError } from "~/components";
import { TDetailAnime } from "~/types";
import { Exception } from "~/utils/exception";

type TTitle = {
  detailAnime: {
    data: {
      title: string;
    };
  };
};

export const meta: MetaFunction = ({ data }) => {
  return [{ title: (data as TTitle).detailAnime.data.title || "" }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const animeTitle = params.animeTitle;

  if (!animeTitle) throw new Response(404, "Query not found");

  const detailAnime = await new DetailAnime().get(animeTitle).catch((error) => {
    console.log(error);

    if (error instanceof Exception) {
      throw new Response(error.status, error.statusText);
    }
  });

  return defer(
    { detailAnime },
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
      {
        <Suspense fallback={<div>Loading bro</div>}>
          <Await resolve={detailAnime} errorElement={<AsyncError />}>
            {(detail) => <DetailAnimeComp anime={detail.data as TDetailAnime} />}
          </Await>
        </Suspense>
      }
    </div>
  );
}
