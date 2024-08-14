import { Await, defer, MetaFunction, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { AsyncError, GenreCards } from "~/components";
import { Genres } from "~/services";
import { TGenre } from "~/types";

export const meta: MetaFunction = () => {
  return [{ title: "Genres" }];
};

export async function loader() {
  const genres = new Genres().get();

  return defer({ genres });
}

export default function Genre() {
  const { genres } = useLoaderData<typeof loader>();

  return (
    <section className="base">
      <Suspense fallback={<>loading...</>}>
        <Await resolve={genres} errorElement={<AsyncError />}>
          {(genres) => <GenreCards genres={genres.data as TGenre[]} />}
        </Await>
      </Suspense>
    </section>
  );
}
