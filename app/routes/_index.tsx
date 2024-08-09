import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { OngoingAnime } from "~/services/ongoingAnime";
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

  if (!ongoingAnime) {
    throw new Exception("internal server error");
  }

  return defer(
    { ongoingAnime },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
    }
  );
}

export default function Index() {
  const { ongoingAnime } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <h1 className="heading-1">Ongoing anime</h1>
      <Suspense fallback={<CardSkeleton />}>
        <Await resolve={ongoingAnime} errorElement={<AsyncError />}>
          {(animes) => <Cards animes={animes.data as TBaseAnime[]} totalPage={6} />}
        </Await>
      </Suspense>
    </div>
  );
}
