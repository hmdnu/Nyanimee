import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getOngoingAnime } from "~/api/ongoingAnime";
import { useLoaderData, Await, defer, json } from "@remix-run/react";
import { Suspense } from "react";
import { Cards, CardSkeleton } from "~/components/index";

export const meta: MetaFunction = () => {
  return [{ title: "OtakuDl" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const pageQuery = new URL(request.url).searchParams.get("page");

  const ongoingAnime = await getOngoingAnime(pageQuery || "1");

  if (!ongoingAnime) throw json("Internal server error", { status: 500 });

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
    <>
      <main className="base">
        <h1 className="heading-1 mb-[40px]">Ongoing anime</h1>
        <Suspense fallback={<CardSkeleton />}>
          <Await resolve={ongoingAnime}>{(animes) => <Cards animes={animes} totalPage={6} />}</Await>
        </Suspense>
      </main>
    </>
  );
}
