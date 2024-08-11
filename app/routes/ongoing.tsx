import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { OngoingAnime } from "~/services/ongoing";
import { useLoaderData, Await, defer } from "@remix-run/react";
import { Suspense } from "react";
import { Cards, CardSkeleton, AsyncError } from "~/components/index";
import { Exception, Response } from "~/utils";
import { TBaseAnime } from "~/types";

export const meta: MetaFunction = () => {
  return [{ title: "nyanime" }, { name: "nyanime", content: "anime downlad subtitle indo" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const pageQuery = new URL(request.url).searchParams.get("page");

  const ongoingAnime = new OngoingAnime().get(pageQuery || "1").catch((error) => {
    if (error instanceof Exception) {
      throw new Response(error.status, error.message);
    }
  });

  return defer(
    { ongoingAnime },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
    }
  );
}

export default function Ongoing() {
  const { ongoingAnime } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <h1 className="heading-1 mb-[40px]">Ongoing anime</h1>
      <Suspense fallback={<CardSkeleton totalCards={10} />}>
        <Await resolve={ongoingAnime} errorElement={<AsyncError />}>
          {(animes) => <Cards animes={animes.data as TBaseAnime[]} totalPage={6} />}
        </Await>
      </Suspense>
    </div>
  );
}
