import type { MetaFunction } from "@remix-run/node";
import { getOngoingAnime } from "~/api/ongoingAnime";
import { json } from "@remix-run/node";
import { useLoaderData, Await } from "@remix-run/react";
import { TOngoingAnimes } from "~/types";
import { Suspense } from "react";
import { OngoingAnimesCards } from "~/components/index";

export const meta: MetaFunction = () => {
  return [{ title: "OtakuDl" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function loader() {
  const ongoingAnime = await getOngoingAnime();
  const maxAge = 60 * 5;
  return json(ongoingAnime, {
    headers: {
      "Cache-Control": "max-age=" + maxAge,
    },
  });
}

export default function Index() {
  const ongoingAnime = useLoaderData<TOngoingAnimes[]>();

  return (
    <>
      <main className="base">
        <h1 className="heading-1 mb-[40px]">Ongoing anime</h1>
        <Suspense fallback={<div>Loading bro</div>}>
          <Await resolve={ongoingAnime}>{(animes) => <OngoingAnimesCards ongoingAnimes={animes} />}</Await>
        </Suspense>
      </main>
    </>
  );
}
