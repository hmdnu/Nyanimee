import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, json, MetaFunction, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { Cards, CardSkeleton } from "~/components";
import { CompletedAnime } from "~/services";
import { TCompletedAnime } from "~/services/completedAnime";

export const meta: MetaFunction = () => {
  return [{ title: "Completed Anime" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const query = new URL(request.url).searchParams.get("page");

  const completeAnime = new CompletedAnime().get(query || "1");

  if (!completeAnime) throw json("Internal server error", { status: 500 });

  return defer({ completeAnime });
}

export default function CompletedAnimePage() {
  const { completeAnime } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <h1 className="heading-1 mb-[40px]">Completed Anime</h1>
      <Suspense fallback={<CardSkeleton />}>
        <Await resolve={completeAnime}>
          {(anime) => (
            <Cards animes={(anime.data as TCompletedAnime).completedAnimes} totalPage={Number((anime.data as TCompletedAnime).lastPagination)} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
