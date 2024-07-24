import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, json, Await, defer } from "@remix-run/react";
import { Suspense } from "react";
import { getDetailAnime } from "~/api";
import { DetailAnime } from "~/components";
import { TDetailAnime } from "~/types";

export const meta: MetaFunction = ({ data }) => {
  return [{ title: (data as { detailAnime: TDetailAnime }).detailAnime.title }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const animeTitle = params.animeTitle;

  if (!animeTitle) throw json("Anime Title Not Found", { status: 404 });

  const detailAnime = await getDetailAnime(animeTitle);

  if (!detailAnime) throw json("Internal server error", { status: 500 });

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
          <Await resolve={detailAnime}>{(detail) => <DetailAnime anime={detail} />}</Await>
        </Suspense>
      }
    </div>
  );
}
