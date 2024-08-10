import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, MetaFunction, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { Cards, CardSkeleton } from "~/components";
import { CompletedAnime } from "~/services";
import { TCompletedAnime } from "~/services/completedAnime";
import { Exception, Response } from "~/utils";

export const meta: MetaFunction = () => {
  return [{ title: "Completed Anime" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const query = new URL(request.url).searchParams.get("page");

  const completeAnime = new CompletedAnime().get(query || "1").catch((error) => {
    if (error instanceof Exception) {
      throw new Response(error.status, error.message);
    }
  });

  return defer(
    { completeAnime },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
    }
  );
}

export default function CompletedAnimePage() {
  const { completeAnime } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <h1 className="heading-1 mb-[40px]">Completed Anime</h1>
      <Suspense fallback={<CardSkeleton totalCards={10} />}>
        <Await resolve={completeAnime}>
          {(anime) => (
            <Cards animes={(anime.data as TCompletedAnime).completedAnimes} totalPage={Number((anime.data as TCompletedAnime).lastPagination)} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
