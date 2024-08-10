import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { Response, SearchAnime } from "~/services";
import { Cards, CardSkeleton } from "~/components";
import { TBaseAnime } from "~/types";
import { Exception } from "~/utils";

export const meta: MetaFunction<typeof loader> = ({ location }) => {
  const query = location.search.split("=")[1].replace("+", " ");

  return [{ title: `Result for ${query}` }];
};

export async function loader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const animeTitle = url.searchParams.get("title") || "";

  if (!animeTitle) throw new Response(404, "Missing query");

  const animes = new SearchAnime().get(animeTitle).catch((error) => {
    if (error instanceof Exception) {
      throw new Response(error.status, error.message);
    }
  });

  return defer(
    { animes, query: animeTitle },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
    }
  );
}

export default function SearchAnimePage() {
  const { animes, query } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <h2 className="heading-2 mb-[40px]">Result for {query}</h2>
      <Suspense fallback={<CardSkeleton totalCards={5} />}>
        <Await resolve={animes}>{(anime) => <Cards animes={anime.data as TBaseAnime[]} totalPage={0} />}</Await>
      </Suspense>
    </div>
  );
}
