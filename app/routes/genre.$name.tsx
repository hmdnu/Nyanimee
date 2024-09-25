import { LoaderFunctionArgs } from "@remix-run/node";
import { defer, useLoaderData } from "@remix-run/react";
import { Genres } from "~/services";
import { Response } from "~/utils";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params) {
    throw new Response(404, "Param not found");
  }

  const animes = await new Genres().getAnimeByGenre(String(params.name));

  return defer({ animes });
}

export default function GenrePage() {
  const { animes } = useLoaderData<typeof loader>();

  console.log(animes);

  return <div className="base">{""}</div>;
}
