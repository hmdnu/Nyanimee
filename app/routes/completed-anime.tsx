import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getCompletedAnimes } from "~/api";
import { Cards, CardSkeleton } from "~/components";

export const meta: MetaFunction = () => {
  return [{ title: "Completed Anime" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const query = new URL(request.url).searchParams.get("page");

  const completeAnime = getCompletedAnimes(query || "1");

  if (!completeAnime) throw json("Internal server error", { status: 500 });

  return defer({ completeAnime });
}

export default function CompletedAnimePage() {
  const { completeAnime } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <Suspense fallback={<CardSkeleton />}>
        <Await resolve={completeAnime}>{(anime) => <Cards animes={anime.completedAnimes} totalPage={Number(anime.lastPagination)} />}</Await>
      </Suspense>
    </div>
  );
}
