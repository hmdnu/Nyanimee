import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Await, defer, json, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { searchAnime } from "~/api";
import { CardSkeleton } from "~/components";
import SearchedAnime from "~/components/SearchedAnime";

export const meta: MetaFunction<typeof loader> = ({ location }) => {
  const query = location.search.split("=")[1].replace("+", " ");

  return [{ title: `Result for ${query}` }];
};

export async function loader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const animeTitle = url.searchParams.get("title") || "";

  if (!animeTitle) throw json("Anime title not found", { status: 404 });

  const animes = searchAnime(animeTitle);

  if (!animes) throw json("Internal server erorr", { status: 500 });

  return defer({ animes, query: animeTitle });
}

export default function SearchAnimePage() {
  const { animes, query } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <h2 className="heading-2 mb-[40px]">Result for {query}</h2>
      <Suspense fallback={<CardSkeleton />}>
        <Await resolve={animes}>{(animes) => <SearchedAnime animes={animes} />}</Await>
      </Suspense>
    </div>
  );
}