import { MetaFunction } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getAnimeLists } from "~/services/animeLists";
import { AnimeLists, AsyncError, ListsSkeleton } from "~/components";

export const meta: MetaFunction = () => {
  return [{ title: "List Anime" }];
};

export async function loader() {
  const animeLists = getAnimeLists();

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
          {(animes) => <AnimeLists animes={animes} />}
        </Await>
      </Suspense>
    </div>
  );
}
