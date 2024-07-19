import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, json, Await } from "@remix-run/react";
import { Suspense } from "react";
import { getDetailAnime } from "~/api";
import { DetailAnime } from "~/components";
import { TDetailAnime } from "~/types";

export const meta: MetaFunction = ({ data }) => {
  return [{ title: (data as TDetailAnime).title }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const animeTitle = params.animeTitle;

  if (!animeTitle) throw json("Anime Title Not Found", { status: 404 });

  const detailAnime = await getDetailAnime(animeTitle);

  const maxAge = 60 * 60 * 24;
  return json(detailAnime, {
    headers: {
      "Cache-Control": "max-age" + maxAge,
    },
  });
}

export default function DetailAnimePage() {
  const detailAnime = useLoaderData<TDetailAnime>();

  return (
    <main className="base">
      {
        <Suspense fallback={<div>Loading bro</div>}>
          <Await resolve={detailAnime}>{(detail) => <DetailAnime anime={detail} />}</Await>
        </Suspense>
      }
    </main>
  );
}
