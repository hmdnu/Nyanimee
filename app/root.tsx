import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import "./tailwind.css";
import { Nav, ErrorPage } from "./components/index";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-primary text-white">
        <Nav />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorPage status={error.status} statusText={error.statusText} />;
  } else if (error instanceof Error) {
    return <ErrorPage statusText={error.message} />;
  } else {
    return <ErrorPage statusText={"Internal server error"} status={500} />;
  }
}

export default function App() {
  return <Outlet />;
}
