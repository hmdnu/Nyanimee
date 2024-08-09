import { MetaFunction } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { AnimeList } from "~/services/animeLists";
import { AnimeLists, AsyncError, ListsSkeleton } from "~/components";
import { TAnimeLists } from "~/types";

export const meta: MetaFunction = () => {
  return [{ title: "List Anime" }];
};

export async function loader() {
  const animeLists = new AnimeList().get();

  return defer(
    { animeLists },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
    }
  );
}

export default function AnimeListsPage() {
  const { animeLists } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <Suspense fallback={<ListsSkeleton />}>
        <Await resolve={animeLists} errorElement={<AsyncError />}>
          {(animes) => <AnimeLists animes={animes.data as TAnimeLists[]} />}
        </Await>
      </Suspense>
    </div>
  );
}
