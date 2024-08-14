import { LoaderFunctionArgs } from "@remix-run/node";
import { defer, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params);

  return defer({ params });
}

export default function GenrePage() {
  const { params } = useLoaderData<typeof loader>();

  return <div className="base">{params.name}</div>;
}
