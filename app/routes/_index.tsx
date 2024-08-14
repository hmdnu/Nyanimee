import type { MetaFunction } from "@remix-run/node";
import { OngoingAnime } from "~/services/ongoing";
import { useLoaderData, Await, defer, Link } from "@remix-run/react";
import { Suspense } from "react";
import { CardSkeleton, AsyncError, Carousel } from "~/components/index";
import { Exception, Response } from "~/utils";
import { TBaseAnime } from "~/types";
import Card from "~/components/Card";
import { CompletedAnime } from "~/services";
import { TCompletedAnime } from "~/services/completed";

export const meta: MetaFunction = () => {
  return [{ title: "Nyanimee" }, { name: "nyanime", content: "anime downlad subtitle indo" }];
};

export async function loader() {
  const ongoingAnime = new OngoingAnime().get(String(1)).catch((error) => {
    if (error instanceof Exception) {
      throw new Response(error.status, error.message);
    }
  });

  const completedAnime = new CompletedAnime().get(String(1)).catch((error) => {
    if (error instanceof Exception) {
      throw new Response(error.status, error.message);
    }
  });

  return defer(
    { ongoingAnime, completedAnime },
    {
      headers: {
        "Cache-Control": "max-age=" + 60 * 60,
      },
    }
  );
}

export default function Index() {
  const { ongoingAnime, completedAnime } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <section className="mb-[40px]">
        <h1 className="heading-1 mb-[20px]">Ongoing anime</h1>
        <Suspense fallback={<CardSkeleton totalCards={5} />}>
          <Await resolve={ongoingAnime} errorElement={<AsyncError />}>
            {(animes) => (
              <>
                <Carousel>
                  {(animes.data as TBaseAnime[]).map((anime) => (
                    <Card
                      key={anime.title}
                      title={anime.title}
                      coverImg={anime.coverImg}
                      href={anime.href}
                      day={anime.day}
                      episode={anime.episode}
                      score={anime.score}
                      status={anime.status}
                      totalEpisode={anime.totalEpisode}
                    />
                  ))}
                </Carousel>
                <Link to={"/ongoing"} className="flex w-full justify-center">
                  <span className="px-4 py-2 heading-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 rounded-[10px] transition">See more</span>
                </Link>
              </>
            )}
          </Await>
        </Suspense>
      </section>

      <section>
        <h1 className="heading-1 mb-[20px]">Completed anime</h1>
        <Suspense fallback={<CardSkeleton totalCards={5} />}>
          <Await resolve={completedAnime} errorElement={<AsyncError />}>
            {(animes) => (
              <>
                <Carousel>
                  {(animes.data as TCompletedAnime).completedAnimes.map((anime) => (
                    <Card
                      key={anime.title}
                      title={anime.title}
                      coverImg={anime.coverImg}
                      href={anime.href}
                      day={anime.day}
                      episode={anime.episode}
                      score={anime.score}
                      status={anime.status}
                      totalEpisode={anime.totalEpisode}
                    />
                  ))}
                </Carousel>
                <Link to={"/completed"} className="flex w-full justify-center mt-3">
                  <span className="px-4 py-2 heading-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 rounded-[10px] transition">See more</span>
                </Link>
              </>
            )}
          </Await>
        </Suspense>
      </section>
    </div>
  );
}
